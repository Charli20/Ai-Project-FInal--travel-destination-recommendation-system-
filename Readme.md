Travel Recommendation System in Sri Lanka
📌 Project Overview

This is an offline-first travel recommendation system designed to provide personalized suggestions for tourists in Sri Lanka. The system combines offline SBERT embeddings with an optional online Google Gemini API for embedding generation. It also includes route planning, hidden gem detection, PDF export, and map visualization features.

The frontend is built using React.js with Leaflet.js for maps and Swiper.js for interactive sliders, while the backend is powered by Python.

🛠 Features

Personalized recommendations based on user query and category (Family, Couples, Solo, Business, Friends)

Hidden gem identification based on low review count destinations

Route planning using haversine distance

Map visualization of destinations

PDF export of selected destinations (optional)

Offline-first mode using SBERT embeddings

Optional online enhancement with Google Gemini embeddings


pip install numpy pandas scikit-learn sentence-transformers fpdf flask flask-cors requests
pip install google-genai

#run the bellow one on cd frontend after that
npm install axios react-leaflet leaflet swiper html2canvas jspdf framer-motion
