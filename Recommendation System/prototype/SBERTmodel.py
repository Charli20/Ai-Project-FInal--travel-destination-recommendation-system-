from sentence_transformers import SentenceTransformer
sbert_model = SentenceTransformer("all-MiniLM-L6-v2")

MODEL_PATH = r"C:\\NIBM\\Travel recommendation system\\Travel-Recommendation-system-in-Sri-Lanka-\\Recommendation System\\model"
sbert_model.save(MODEL_PATH)

print(f"✅ SBERT model saved locally at {MODEL_PATH}")
