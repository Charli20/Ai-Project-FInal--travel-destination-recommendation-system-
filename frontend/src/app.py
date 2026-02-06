# from flask import Flask, request, jsonify
# from flask_cors import CORS
# from recommendation import get_recommendations


# app = Flask(__name__)
# CORS(app)

# @app.route("/api/recommend", methods=["POST"])
# def recommend():
#     data = request.json
#     query = data.get("query", "")
#     category = data.get("category", "all")
#     results = get_recommendations(query, category)
#     return jsonify(results)

# if __name__ == "__main__":
#     app.run(port=5000, debug=True)


from flask import Flask, request, jsonify
from flask_cors import CORS
from recommendation import get_recommendations, plan_route, clear_cart

app = Flask(__name__)
CORS(app)

@app.route("/api/recommend", methods=["POST"])
def recommend():
    data = request.json
    query = data.get("query", "")
    category = data.get("category", "all")
    results = get_recommendations(query, category)
    return jsonify(results)

@app.route("/api/plan_route", methods=["POST"])
def route():
    data = request.json
    start_point_name = data.get("start_point")
    selected_destinations = data.get("selected_destinations", [])

    if start_point_name not in plan_route.__globals__["START_POINTS"]:
        return jsonify({"error": "Invalid starting point"}), 400
    start_coords = plan_route.__globals__["START_POINTS"][start_point_name]

    route_order = plan_route(start_coords, selected_destinations)
    return jsonify(route_order)

@app.route("/api/clear_cart", methods=["POST"])
def clear_user_cart():
    clear_cart()
    return jsonify({"status": "cart cleared"})

if __name__ == "__main__":
    app.run(port=5000, debug=True)


# from flask import Flask, request, jsonify, send_file
# from flask_cors import CORS
# from recommendation import get_recommendations, plan_route, clear_cart

# app = Flask(__name__)
# CORS(app)

# # ---------------------------
# # Recommend destinations
# # ---------------------------
# @app.route("/api/recommend", methods=["POST"])
# def recommend():
#     data = request.json
#     query = data.get("query", "")
#     category = data.get("category", "all")
#     results = get_recommendations(query, category)
#     return jsonify(results)

# # ---------------------------
# # Plan route based on start point + selected destinations
# # ---------------------------
# @app.route("/api/plan_route", methods=["POST"])
# def route():
#     data = request.json
#     start_point_name = data.get("start_point")
#     selected_destinations = data.get("selected_destinations", [])

#     if start_point_name not in plan_route.__globals__["START_POINTS"]:
#         return jsonify({"error": "Invalid starting point"}), 400
#     start_coords = plan_route.__globals__["START_POINTS"][start_point_name]

#     route_order = plan_route(start_coords, selected_destinations)
#     return jsonify(route_order)

# # ---------------------------
# # Generate PDF with route + selected destinations
# # ---------------------------
# @app.route("/api/generate_pdf", methods=["POST"])
# def pdf():
#     data = request.json
#     filename = data.get("filename", "travel_plan.pdf")
#     selected_destinations = data.get("selected_destinations", [])
#     pdf_file = generate_pdf(filename=filename, route=selected_destinations)
#     if pdf_file is None:
#         return jsonify({"error": "PDF generation failed"}), 500
#     # Return PDF as file
#     return send_file(pdf_file, as_attachment=True)

# # ---------------------------
# # Clear cart (frontend only)
# # ---------------------------
# @app.route("/api/clear_cart", methods=["POST"])
# def clear_user_cart():
#     clear_cart()
#     return jsonify({"status": "cart cleared"})

# if __name__ == "__main__":
#     app.run(port=5000, debug=True)
