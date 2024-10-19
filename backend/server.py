from flask import Flask, request
from flask_cors import CORS
import helper as db
import google.cloud.storage
import os

app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}})

@app.route('/upload_file', methods=['POST'])
def upload_file_route():
    file = request.files['file']
    db.upload_file(file)
    print(file)
    return "success", 200

if __name__ == '__main__':
    app.run(debug=True)