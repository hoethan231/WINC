from dotenv import load_dotenv
import google.cloud.storage
import singlestoredb as s2
import hashlib
import os
import json
from describe import get_clothing_JSON
from describe import embed

load_dotenv()

def create_user(username, password, email):
    try:
        conn = s2.connect(os.getenv("SSDB_URL"))
        with conn.cursor() as cur:
            password = hashlib.sha256(password.encode()).hexdigest()
            cur.execute("INSERT INTO users (username, pass, email) VALUES (%s, %s, %s)", 
                        (username, password, email))
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
            cur.execute("SELECT * FROM users WHERE username = %s AND pass = %s", (username, password))
            return len(cur.fetchall()) == 1
    except Exception as e:
        print("Error: ", e)

def add_clothe(description, category, imgURL, userID, embedding):
    try:
        conn = s2.connect(os.getenv("SSDB_URL"))
        with conn.cursor() as cur:
            cur.execute("INSERT INTO clothe (descriptionn, category, imgURL, userID, description_embedding) VALUES (%s, %s, %s, %s, %s)", 
                        (description, category, imgURL, userID, embedding))
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
            cur.execute("UPDATE clothe SET descriptionn = %s WHERE id = %s", (description, id))
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
        bucket = storage_client.get_bucket('bucket_of_photos')

        blob = bucket.blob(file_name+".png")
        blob.upload_from_file(file, content_type=f'image/png')
        
        # generate gemini image description
        response = get_clothing_JSON(blob.public_url)
        json_response = json.loads(response)
        description = json_response['description'] + " " + "tags: ".join(json_response['tags'])
        embedding = str(embed(description)["embedding"])
        print(embedding)
        add_clothe(description, json_response['type'], blob.public_url, 2251799813685250, embedding)
        
    except Exception as e:
        print("Error: ", e)