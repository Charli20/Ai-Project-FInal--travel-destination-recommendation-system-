import os
import re
import socket
import numpy as np
import pandas as pd
import pickle
from sentence_transformers import SentenceTransformer

try:
    from google import genai
except ImportError:
    pass

DATA_PATH = r"C:\NIBM\Travel recommendation system\Travel-Recommendation-system-in-Sri-Lanka-\Data Preparation\document_data\documents_updated.csv"
GEMINI_EMBED_PATH = r"C:\NIBM\Travel recommendation system\Travel-Recommendation-system-in-Sri-Lanka-\Recommendation System\embeddings\gemini_embeddings.pkl"
SBERT_EMBED_PATH = r"C:\NIBM\Travel recommendation system\Travel-Recommendation-system-in-Sri-Lanka-\Recommendation System\embeddings\sbert_embeddings.pkl"
SBERT_MODEL_PATH = r"C:\NIBM\Travel recommendation system\Travel-Recommendation-system-in-Sri-Lanka-\Recommendation System\model"

TOP_N = 10
HIDDEN_GEM_THRESHOLD = 50

CATEGORY_COLUMN_MAP = {
    "family": "Family %",
    "couples": "Couples %",
    "solo": "Solo %",
    "business": "Business %",
    "friends": "Friends %"
}

def has_internet(timeout=2):
    try:
        socket.create_connection(("8.8.8.8", 53), timeout=timeout)
        return True
    except OSError:
        return False

INTERNET_AVAILABLE = has_internet()


if INTERNET_AVAILABLE:
    print(" Strong internet detected → Using Gemini (online)")
    import google.genai as genai
    client = genai.Client(api_key="AIzaSyCeO-Zq3UYHkFvj_o451tl_BCX-yc1c3zU")
    USE_GEMINI = True
else:
    print(" No internet → Using SBERT (Offline Mode)")
    sbert_model = SentenceTransformer(SBERT_MODEL_PATH, local_files_only=True)
    USE_GEMINI = False

def text_preprocessing(text):
    text = str(text).lower()
    text = re.sub(r"<.*?>", " ", text)
    text = re.sub(r"[^\w\s]", " ", text)
    text = re.sub(r"\s+", " ", text).strip()
    return text

def cosine_similarity(a, b):
    return np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b))

print("📥 Loading dataset...")
df = pd.read_csv(DATA_PATH)
df["embedding_text"] = df["Destination Title"].astype(str) + ". " + df["Document Text"].astype(str)
df["clean_embedding"] = df["embedding_text"].apply(text_preprocessing)


if USE_GEMINI:
    with open(GEMINI_EMBED_PATH, "rb") as f:
        df["embedding_vector"] = pickle.load(f)
    print(" Loaded Gemini embeddings (768-dim)")
else:
    with open(SBERT_EMBED_PATH, "rb") as f:
        df["embedding_vector"] = pickle.load(f)
    print(" Loaded SBERT embeddings (384-dim)")

print("\n🌍 Travel Recommendation System")
print("-" * 45)

query = input("Enter your travel query: ").strip()

print("\nSelect travel category:")
print("1. All\n2. Family\n3. Couples\n4. Solo\n5. Business\n6. Friends")
category_choice = input("Enter number (1-6): ").strip()

category_map = {"1":"all","2":"family","3":"couples","4":"solo","5":"business","6":"friends"}
selected_category = category_map.get(category_choice, "all")

filtered_df = df.copy()
if selected_category != "all":
    column = CATEGORY_COLUMN_MAP[selected_category]
    filtered_df = filtered_df[filtered_df[column] > 0]

if USE_GEMINI:
    query_embedding = np.array(
        client.models.embed_content(
            model="gemini-embedding-001",
            contents=query
        ).embeddings[0].values
    )
else:
    query_embedding = sbert_model.encode([query], convert_to_tensor=False)[0]


hidden_df = filtered_df[filtered_df["Total Reviews"] <= HIDDEN_GEM_THRESHOLD].copy()
hidden_df["similarity_score"] = hidden_df["embedding_vector"].apply(lambda x: cosine_similarity(query_embedding, x))
hidden_df = hidden_df.sort_values(by="similarity_score", ascending=False).head(TOP_N)

print("\n Hidden Gem Recommendations")
print(hidden_df[["Destination Title", "Destination Score", "Total Reviews", "similarity_score"]])

filtered_df["similarity_score"] = filtered_df["embedding_vector"].apply(lambda x: cosine_similarity(query_embedding, x))
general_rec = filtered_df.sort_values(by="similarity_score", ascending=False).head(TOP_N)

print("\n Top Recommendations")
print(general_rec[["Destination Title", "Destination Score", "Total Reviews", "similarity_score"]])

print("\n Done!")


