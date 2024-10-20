import os

import helper as db
from flask import Flask, jsonify, request
from flask_cors import CORS
from image_segmentation import crop_image

app = Flask(__name__)
CORS(app)


@app.route("/upload_file", methods=["POST"])
def upload_file_route():
    try:
        file = request.files.get("file")
        if not file:
            return jsonify({"error": "Invalid file"}), 400
        file_name, file_extension = os.path.splitext(file.filename)
        file = crop_image(file)
        db.upload_file(file, file_name)
        return "success", 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/upload_outfit", methods=["POST"])
def upload_outfit_route():
    data = request.json
    if not data:
        return jsonify({"error": "Invalid input"}), 400
    # Check if outfit exists
    outfit_id = db.get_outfit_id(
        data["userID"], data["top_part_url"], data["bottom_part_url"]
    )
    if outfit_id:
        print(outfit_id)
        return jsonify({"error": "Outfit already exists"}), 400
    db.add_outfit(
        data["userID"],
        data["top_part_url"],
        data["bottom_part_url"],
        data["date_added"],
        data["saved"],
    )
    return "success", 200


@app.route("/bookmark_outfit", methods=["POST"])
def upload_outfit_route():
    data = request.json
    if not data:
        return jsonify({"error": "Invalid input"}), 400
    outfit_id = db.get_outfit_id(
        data["userID"], data["top_part_url"], data["bottom_part_url"]
    )
    if not outfit_id:
        return jsonify({"error": "Outfit ID does not exist"}), 400
    db.update_outfit_saved(data["userID"], outfit_id, data["saved"])
    return "success", 200


@app.route("/login", methods=["POST"])
def login():
    data = request.json
    if not data:
        return jsonify({"error": "Invalid input"}), 400
    userID = db.get_userID(data["email"], data["password"])
    if userID:
        return {"userID": userID[0][0]}, 200
    return jsonify({"error": "Authentication failed"}), 401


@app.route("/register", methods=["POST"])
def register():
    data = request.json
    if not data:
        return jsonify({"error": "Invalid input"}), 400
    db.create_user(
        data["first"], data["last"], data["username"], data["password"], data["email"]
    )


@app.route("/get_images", methods=["GET"])
def get_clothes():
    clothes = db.get_clothes(2251799813685250)
    return jsonify(clothes), 200


@app.route("/get_combinations", methods=["POST"])
def get_combinations():
    data = request.json
    if not data:
        return jsonify({"error": "Error fetching"}), 400
    n_tops = list(
        map((lambda x: x[0]), db.rag_top_items(data["vibe"], data["limit"], "top"))
    )
    n_bottoms = list(
        map((lambda x: x[0]), db.rag_top_items(data["vibe"], data["limit"], "bottom"))
    )
    combinations = zip(n_tops, n_bottoms)
    return list(combinations)


if __name__ == "__main__":
    app.run(debug=True)
