from dotenv import load_dotenv
import google.cloud.storage
import singlestoredb as s2
import hashlib
import os
import json
from describe import get_clothing_JSON
from describe import embed

load_dotenv()

def create_user(first, last, username, password, email):
    try:
        conn = s2.connect(os.getenv("SSDB_URL"))
        with conn.cursor() as cur:
            password = hashlib.sha256(password.encode()).hexdigest()
            cur.execute("INSERT INTO users (firstName, lastName, username, pass, email) VALUES (%s, %s, %s, %s, %s)", 
                        (first, last, username, password, email))
    except Exception as e:
        print("Error: ", e)

def delete_user(id):
    try:
        conn = s2.connect(os.getenv("SSDB_URL"))
        with conn.cursor() as cur:
            cur.execute("DELETE FROM users WHERE id = %s", (id))
    except Exception as e:
        print("Error: ", e)
        
def get_userID(email, password):
    try:
        conn = s2.connect(os.getenv("SSDB_URL"))
        with conn.cursor() as cur:
            password = hashlib.sha256(password.encode()).hexdigest()
            cur.execute("SELECT id FROM users WHERE email = %s AND pass = %s", (email, password))
            return cur.fetchall()
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


def upload_file(file, file_name):
    try:
        storage_client = google.cloud.storage.Client()
        bucket = storage_client.get_bucket('bucket_of_photos')

        blob = bucket.blob(file_name+".png")
        blob.upload_from_file(file, content_type=f'image/png')
        
        # generate gemini image description
        response = get_clothing_JSON(blob.public_url)
        json_response = json.loads(response)
        description = json_response['description'] + " tags: " + ", ".join(json_response['tags'])
        embedding = str(embed(description)["embedding"])
        add_clothe(description, json_response['type'], blob.public_url, 2251799813685250, embedding)
        
    except Exception as e:
        print("Error: ", e)

def get_clothes(userID):
    try:
        conn = s2.connect(os.getenv("SSDB_URL"))
        with conn.cursor() as cur:
            cur.execute("SELECT descriptionn, category, imgURL FROM clothe WHERE userID = %s", (userID))
            results = cur.fetchall()
            json_results = []
            for result in results:
                json_result = {
                    "description": result[0],
                    "category": result[1],
                    "imgURL": result[2]
                }
                json_results.append(json_result)
            print(json.dumps(json_results, indent=4))
            return json_results
    except Exception as e:
        print("Error: ", e)

def rag_top_items(vibe, limit, clothing_type):
    try:
        conn = s2.connect(os.getenv("SSDB_URL"))
        with conn.cursor() as cur:
            search = embed(vibe)["embedding"]

            query = f"""
            SELECT imgURL, description_embedding <*> ('{search}':>VECTOR(768)) AS score
            FROM clothe
            WHERE category = "{clothing_type}"
            ORDER BY score DESC
            LIMIT {limit};
            """

            cur.execute(query)

            results = cur.fetchall()
            return results
    except Exception as e:
        print("Error: ", e)