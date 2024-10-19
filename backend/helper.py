from dotenv import load_dotenv
import singlestoredb as s2
import hashlib
import os

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
            return len(cur.execute("SELECT * FROM users WHERE (user, pass) VALUES (%s, %s)", (username, password))) == 1
    except Exception as e:
        print("Error: ", e)

create_user("cat", "wiskers", "catzz@")
user_exist("cat", "wiskers")