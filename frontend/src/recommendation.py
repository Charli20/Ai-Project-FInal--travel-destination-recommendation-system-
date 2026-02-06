
import os
import re
import socket
import pickle
import numpy as np
import pandas as pd
from math import radians, cos, sin, asin, sqrt
from sentence_transformers import SentenceTransformer

# Optional for PDF generation
try:
    from fpdf import FPDF
except ImportError:
    FPDF = None

# Only import Gemini if online
try:
    from google import genai
except ImportError:
    genai = None

# =====================================================
# CONFIGURATION
# =====================================================
DATA_PATH = r"C:\\NIBM\\Travel recommendation system\\Travel-Recommendation-system-in-Sri-Lanka-\\Data Preparation\\document_data\\documents_updated.csv"
GEMINI_EMBED_PATH = r"C:\\NIBM\\Travel recommendation system\\Travel-Recommendation-system-in-Sri-Lanka-\\Recommendation System\\embeddings\\gemini_embeddings.pkl"
SBERT_EMBED_PATH = r"C:\\NIBM\\Travel recommendation system\\Travel-Recommendation-system-in-Sri-Lanka-\\Recommendation System\\embeddings\\sbert_embeddings.pkl"
SBERT_MODEL_PATH = r"C:\\NIBM\\Travel recommendation system\\Travel-Recommendation-system-in-Sri-Lanka-\\Recommendation System\\model"

TOP_N = 10
HIDDEN_GEM_THRESHOLD = 50

CATEGORY_COLUMN_MAP = {
    "family": "Family %",
    "couples": "Couples %",
    "solo": "Solo %",
    "business": "Business %",
    "friends": "Friends %"
}

START_POINTS = {
    "Katunayake International Airport": (7.1800, 79.8840),
    "Colombo City": (6.9271, 79.8612),
    "Kandy City": (7.2906, 80.6337),
    "Nuwara Eliya": (6.9497, 80.7896),
    "Maththala International Airport": (8.5791, 81.2330),
    "Galle Fort": (6.0323, 80.2160),
    "Ella Town": (6.8410, 81.0460),
    "Jaffna City": (9.6615, 80.0255),
    "Anuradhapura": (8.3114, 80.4037),
    "Dambulla": (7.8606, 80.6501)
}

# =====================================================
# INTERNET CHECK
# =====================================================
def has_internet(timeout=2):
    try:
        socket.create_connection(("8.8.8.8", 53), timeout=timeout)
        return True
    except OSError:
        return False

INTERNET_AVAILABLE = has_internet() and genai is not None

# =====================================================
# OFFLINE / ONLINE MODEL SETUP
# =====================================================
print("📥 Loading SBERT model (offline fallback)...")
sbert_model = SentenceTransformer(SBERT_MODEL_PATH, local_files_only=True)

USE_GEMINI = False
if INTERNET_AVAILABLE:
    try:
        print("🌐 Internet detected → Using Gemini embeddings if available")
        client = genai.Client(api_key="AIzaSyCeO-Zq3UYHkFvj_o451tl_BCX-yc1c3zU")
        USE_GEMINI = True
    except Exception as e:
        print(f"⚠️ Gemini initialization failed, falling back to SBERT: {e}")
        USE_GEMINI = False

# =====================================================
# TEXT PREPROCESSING
# =====================================================
def text_preprocessing(text):
    text = str(text).lower()
    text = re.sub(r"<.*?>", " ", text)
    text = re.sub(r"[^\w\s]", " ", text)
    text = re.sub(r"\s+", " ", text).strip()
    return text

def cosine_similarity(a, b):
    return np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b))

# =====================================================
# LOAD DATA AND EMBEDDINGS
# =====================================================
print("📥 Loading dataset...")
df = pd.read_csv(DATA_PATH)
df["embedding_text"] = df["Destination Title"].astype(str) + ". " + df["Document Text"].astype(str)
df["clean_embedding"] = df["embedding_text"].apply(text_preprocessing)

# Load embeddings depending on availability
try:
    if USE_GEMINI:
        with open(GEMINI_EMBED_PATH, "rb") as f:
            df["embedding_vector"] = pickle.load(f)
        print("✅ Loaded Gemini embeddings")
    else:
        raise FileNotFoundError  # force fallback if offline
except:
    with open(SBERT_EMBED_PATH, "rb") as f:
        df["embedding_vector"] = pickle.load(f)
    print("✅ Loaded SBERT embeddings")

# =====================================================
# USER CART
# =====================================================
USER_CART = []

def add_to_cart(dest_list):
    global USER_CART
    for dest in dest_list:
        if dest not in USER_CART:
            USER_CART.append(dest)
    return USER_CART

def clear_cart():
    global USER_CART
    USER_CART = []

# =====================================================
# RECOMMENDATION FUNCTION
# =====================================================
def get_recommendations(query, category="all"):
    temp_df = df.copy()

    # Filter by category if needed
    if category != "all" and category in CATEGORY_COLUMN_MAP:
        col = CATEGORY_COLUMN_MAP[category]
        temp_df = temp_df[temp_df[col] > 0]

    # Generate query embedding with Gemini fallback
    query_vector = None
    if USE_GEMINI:
        try:
            query_emb = client.models.embed_content(
                model="text-embedding-004",
                contents=query
            )
            query_vector = np.array(query_emb.embeddings[0].values)
        except Exception as e:
            print(f"⚠️ Gemini embedding failed, falling back to SBERT: {e}")
            query_vector = sbert_model.encode([query], convert_to_tensor=False)[0]
    else:
        query_vector = sbert_model.encode([query], convert_to_tensor=False)[0]

    # Compute similarity safely
    def safe_cosine(x):
        try:
            return cosine_similarity(query_vector, x)
        except ValueError:
            # fallback if dimensions mismatch
            return 0.0

    temp_df["similarity_score"] = temp_df["embedding_vector"].apply(safe_cosine)

    # Hidden gem and top recommendations
    hidden_df = temp_df[temp_df["Total Reviews"] <= HIDDEN_GEM_THRESHOLD].sort_values(
        by="similarity_score", ascending=False
    ).head(TOP_N)

    top_df = temp_df.sort_values(by="similarity_score", ascending=False).head(TOP_N)

    cols_to_send = [c for c in temp_df.columns if c != "embedding_vector"]

    return {
        "hidden_gems": hidden_df[cols_to_send].to_dict(orient="records"),
        "top_recommendations": top_df[cols_to_send].to_dict(orient="records"),
        "map_data": get_map_data(pd.concat([hidden_df, top_df]))
    }

# =====================================================
# ROUTE PLANNING
# =====================================================
def haversine(lon1, lat1, lon2, lat2):
    lon1, lat1, lon2, lat2 = map(radians, [lon1, lat1, lon2, lat2])
    dlon = lon2 - lon1
    dlat = lat2 - lat1
    a = sin(dlat/2)**2 + cos(lat1) * cos(lat2) * sin(dlon/2)**2
    c = 2 * asin(sqrt(a))
    r = 6371
    return c * r

def plan_route(selected_start_point, selected_destinations):
    if not selected_destinations:
        return []
    route = []
    current_lat, current_lon = selected_start_point
    remaining = selected_destinations.copy()
    while remaining:
        nearest = min(
            remaining,
            key=lambda d: haversine(current_lon, current_lat, d["longitude"], d["latitude"])
        )
        route.append(nearest)
        current_lat, current_lon = nearest["latitude"], nearest["longitude"]
        remaining.remove(nearest)
    return route

# =====================================================
# MAP DATA
# =====================================================
def get_map_data(destinations_df):
    map_data = []
    for d in destinations_df.to_dict(orient="records"):
        if d.get("latitude") is None or d.get("longitude") is None:
            continue
        map_data.append({
            "title": d.get("Destination Title"),
            "lat": d.get("latitude"),
            "lon": d.get("longitude"),
            "image_1": d.get("image_1"),
            "image_2": d.get("image_2"),
            "description": d.get("destination_description"),
            "booking": d.get("booking.com"),
            "agoda": d.get("agoda"),
            "google_maps": d.get("google_maps_links"),
            "score": d.get("Destination Score")
        })
    return map_data

print("🎉 recommendation.py ready! (offline-first with SBERT fallback)")
