from google import genai

client = genai.Client(api_key="AIzaSyCeO-Zq3UYHkFvj_o451tl_BCX-yc1c3zU")

print("📋 Available models and their supported actions:\n")
models = client.models.list()
embedding_models = []

for m in models:
   
    if "embed_content" in m.supported_actions: 
        embedding_models.append(m.name)
        print(f"✅ {m.name} supports embeddings")

if not embedding_models:
    print("⚠️ No embedding models found!")

print("\n🧪 Testing first available embedding model with a sample text...")
if embedding_models:
    test_model = embedding_models[0]
    try:
        result = client.models.embed_content(
            model=test_model,
            contents=["Test embedding to check quota"]
        )
        print(f"✅ {test_model} works. Embedding length: {len(result.embeddings[0].values)}")
    except Exception as e:
        print(f"⚠️ {test_model} failed: {e}")

# result = client.models.embed_content(
#         model="gemini-embedding-001",
#         contents= [
#             "What is the meaning of life?",
#             "What is the purpose of existence?",
#             "How do I bake a cake?"
#         ]
# )

# for embedding in result.embeddings:
#     print(embedding)

    
# response = client.models.generate_content(
#     model="gemini-3-flash-preview",
#     contents="Explain how AI works in a few words",
# )

# print(response.text)
# text-embedding-004


