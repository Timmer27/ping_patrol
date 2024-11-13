from db import get_connection, close_connection

def get_data():
    conn, server = get_connection()
    try:
        with conn.cursor() as cursor:
            cursor.execute("SELECT * FROM code_mst;")
            data = cursor.fetchall()
            return data
    finally:
        close_connection(conn, server)

def insert_data(payload):
    conn, server = get_connection()
    try:
        with conn.cursor() as cursor:
            cursor.execute(
                "INSERT INTO your_table (column1, column2) VALUES (%s, %s) RETURNING id;",
                (payload["column1"], payload["column2"])
            )
            conn.commit()
            return cursor.fetchone()["id"]
    finally:
        close_connection(conn, server)
