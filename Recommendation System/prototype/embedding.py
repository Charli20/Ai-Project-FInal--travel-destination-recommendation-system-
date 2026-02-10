import os
import re
import numpy as np
import pandas as pd
import pickle
from google import genai
from sentence_transformers import SentenceTransformer
import time

DATA_PATH = r"C:\\NIBM\\Travel recommendation system\\Travel-Recommendation-system-in-Sri-Lanka-\\Data Preparation\\document_data\\documents_updated.csv"
GEMINI_EMBED_PATH = r"C:\\NIBM\\Travel recommendation system\\Travel-Recommendation-system-in-Sri-Lanka-\\Recommendation System\\embeddings\\gemini_embeddings.pkl"
SBERT_EMBED_PATH = r"C:\\NIBM\\Travel recommendation system\\Travel-Recommendation-system-in-Sri-Lanka-\\Recommendation System\\embeddings\\sbert_embeddings.pkl"


client = genai.Client(api_key="Add Api")


sbert_model = SentenceTransformer('all-MiniLM-L6-v2')


def text_preprocessing(text):
    text = str(text).lower()
    text = re.sub(r"<.*?>", " ", text)
    text = re.sub(r"[^\w\s]", " ", text)
    text = re.sub(r"\s+", " ", text).strip()
    return text


print("📥 Loading dataset...")
df = pd.read_csv(DATA_PATH)
df["embedding_text"] = df["Destination Title"].astype(str) + ". " + df["Document Text"].astype(str)
df["clean_embedding"] = df["embedding_text"].apply(text_preprocessing)

def generate_gemini_embeddings(text_list, batch_size=50, sleep_sec=1):
    embeddings = []
    for i in range(0, len(text_list), batch_size):
        batch = text_list[i:i+batch_size]
        try:
            response = client.models.embed_content(
                model="Use your model ( text embedding 004 or gemini embedding 001)",
                contents=batch
            )
           
            batch_embeddings = [np.array(e.values) for e in response.embeddings]
            embeddings.extend(batch_embeddings)
        except Exception as e:
            print(f"⚠️ Error generating batch {i}-{i+batch_size}: {e}")
           
            fallback_embeddings = sbert_model.encode(batch, convert_to_tensor=False)
            embeddings.extend(fallback_embeddings)
        time.sleep(sleep_sec) 
    return embeddings

try:
    print("🧠 Generating Gemini embeddings...")
    gemini_embeddings = generate_gemini_embeddings(df["clean_embedding"].tolist(), batch_size=50, sleep_sec=1)
    df["gemini_embedding"] = gemini_embeddings
    with open(GEMINI_EMBED_PATH, "wb") as f:
        pickle.dump(df["gemini_embedding"], f)
    print(f"✅ Gemini embeddings saved to {GEMINI_EMBED_PATH}")
except Exception as e:
    print(f"⚠️ Gemini embedding generation failed: {e}")

print("🧠 Generating SBERT fallback embeddings...")
sbert_embeddings = sbert_model.encode(df["clean_embedding"].tolist(), convert_to_tensor=False)
with open(SBERT_EMBED_PATH, "wb") as f:
    pickle.dump(sbert_embeddings.tolist(), f)
print(f"✅ SBERT embeddings saved to {SBERT_EMBED_PATH}")

print("\n🎉 Embedding generation complete!")
