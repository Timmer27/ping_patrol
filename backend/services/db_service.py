from db import get_connection, close_connection
from logger_setup import setup_logger

logging = setup_logger('./db_service.log')

def get_data():
    conn, server = get_connection()
    try:
        with conn.cursor() as cursor:
            cursor.execute("SELECT * FROM code_mst;")
            data = cursor.fetchall()
            return data
    finally:
        close_connection(conn, server)

def update_car_inpection_patrol_result(target_valid_id, inspection_site_id, target_id, is_patrolled):
    conn, server = get_connection()
    try:
        # Ensure is_patrolled is an integer
        is_patrolled = int(is_patrolled)

        with conn.cursor() as cursor:
            cursor.execute(
                """UPDATE public.car_inspection
                   SET updated_at = CURRENT_TIMESTAMP, target_valid_id = %s, is_patrolled = %s
                   WHERE inspection_site_id = %s AND target_id = %s;
                """,
                (target_valid_id, is_patrolled, inspection_site_id, target_id)
            )
            conn.commit()
            logging.info(f'update_car_inpection_patrol_result updated target_valid_id: {target_valid_id}, inspection_site_id: {inspection_site_id}, target_id: {target_id}')
            return True
    except Exception as e:
        logging.error(f'Error when updating update_car_inpection_patrol_result: {e}')
        print(f'Error when updating update_car_inpection_patrol_result: {e}')
        return False
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
