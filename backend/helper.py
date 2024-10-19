from dotenv import load_dotenv
import google.cloud.storage
import singlestoredb as s2
import hashlib
import os

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

def add_clothe(description, category, imgURL, userID):
    try:
        conn = s2.connect(os.getenv("SSDB_URL"))
        with conn.cursor() as cur:
            cur.execute("INSERT INTO clothe (descriptionn, category, imgURL, userID) VALUES (%s, %s, %s, %s)", 
                        (description, category, imgURL, userID))
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
        

def upload_file(file):
    try:
        storage_client = google.cloud.storage.Client()
        file_name, file_extension = os.path.splitext(file.filename)

        bucket = storage_client.get_bucket('bucket_of_photos')

        blob = bucket.blob(file_name + file_extension)
        blob.upload_from_string(file.read(), content_type=file.content_type)
        # add_clothe("theres a froggy", "shirt", blob.public_url, 2251799813685249)
        
    except Exception as e:
        print("Error: ", e)