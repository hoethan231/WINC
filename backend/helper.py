import hashlib
import os

import google.cloud.storage
import google.generativeai as genai
import singlestoredb as s2
from dotenv import load_dotenv

load_dotenv()
genai.configure(api_key=os.environ["GEMINI_API_KEY"])


def create_user(username, password, email):
    try:
        conn = s2.connect(os.getenv("SSDB_URL"))
        with conn.cursor() as cur:
            password = hashlib.sha256(password.encode()).hexdigest()
            cur.execute(
                "INSERT INTO users (username, pass, email) VALUES (%s, %s, %s)",
                (username, password, email),
            )
    except Exception as e:
        print("Error: ", e)


def delete_user(id):
    try:
        conn = s2.connect(os.getenv("SSDB_URL"))
        with conn.cursor() as cur:
            cur.execute("DELETE FROM users WHERE id = %s", (id))
    except Exception as e:
        print("Error: ", e)


def user_exist(username, password):
    try:
        conn = s2.connect(os.getenv("SSDB_URL"))
        with conn.cursor() as cur:
            password = hashlib.sha256(password.encode()).hexdigest()
            cur.execute(
                "SELECT * FROM users WHERE username = %s AND pass = %s",
                (username, password),
            )
            return len(cur.fetchall()) == 1
    except Exception as e:
        print("Error: ", e)


def add_clothe(description, category, imgURL, userID):
    try:
        conn = s2.connect(os.getenv("SSDB_URL"))
        with conn.cursor() as cur:
            cur.execute(
                "INSERT INTO clothe (descriptionn, category, imgURL, userID) VALUES (%s, %s, %s, %s)",
                (description, category, imgURL, userID),
            )
    except Exception as e:
        print("Error: ", e)


def delete_clothe(id):
    try:
        conn = s2.connect(os.getenv("SSDB_URL"))
        with conn.cursor() as cur:
            cur.execute("DELETE FROM clothe WHERE id = %s", (id))
    except Exception as e:
        print("Error: ", e)


def edit_description(id, description):
    try:
        conn = s2.connect(os.getenv("SSDB_URL"))
        with conn.cursor() as cur:
            cur.execute(
                "UPDATE clothe SET descriptionn = %s WHERE id = %s", (description, id)
            )
    except Exception as e:
        print("Error: ", e)


def edit_category(id, category):
    try:
        conn = s2.connect(os.getenv("SSDB_URL"))
        with conn.cursor() as cur:
            cur.execute("UPDATE clothe SET category = %s WHERE id = %s", (category, id))
    except Exception as e:
        print("Error: ", e)


def upload_file(file, file_name, file_extension):
    try:
        storage_client = google.cloud.storage.Client()
        bucket = storage_client.get_bucket("bucket_of_photos")

        blob = bucket.blob(file_name + file_extension)
        blob.upload_from_file(file, content_type=f"image/{file_extension[1:]}")

        # add_clothe("theres a froggy", "shirt", blob.public_url, 2251799813685249)

    except Exception as e:
        print("Error: ", e)

