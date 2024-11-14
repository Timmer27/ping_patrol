from db import get_connection, close_connection
from logger_setup import setup_logger

logging = setup_logger('./db_service.log')

def get_data(table_name) -> list:
    conn, server = get_connection()
    try:
        with conn.cursor() as cursor:
            cursor.execute("SELECT * FROM %s;", (table_name))
            data = cursor.fetchall()
            return data
    finally:
        close_connection(conn, server)

def fetch_inspection_list_data() -> list:
    conn, server = get_connection()
    try:
        with conn.cursor() as cursor:
            cursor.execute(
                """
                    WITH tmp AS (
                        SELECT ci.inspection_site_id,
                            COUNT(ci.is_patrolled) AS total_patrolled_target_count,
                            COUNT(CASE WHEN ci.is_patrolled = '1' THEN 1 END) AS patrolled_target_count,
                            COUNT(CASE WHEN ci.is_patrolled = '0' THEN 1 END) AS not_patrolled_target_count
                        FROM car_inspection ci
                        GROUP BY ci.inspection_site_id
                    )
                    SELECT
                        t1.inspection_site_id,
                        t1.patrolled_target_count,
                        t1.not_patrolled_target_count,
                        t1.total_patrolled_target_count,
                        ROUND(
                            CASE 
                                WHEN t1.total_patrolled_target_count > 0 
                                THEN (t1.patrolled_target_count::float / t1.total_patrolled_target_count)::numeric 
                                ELSE 0
                            END, 2
                        ) AS hit_pct,
                        cm.code_type AS car_english_name,
                        cm.description AS description
                    FROM tmp t1
                    JOIN code_mst cm ON t1.inspection_site_id = cm.code_mst_id
                    ORDER BY t1.inspection_site_id;
                """
            )
            data = cursor.fetchall()
            return data
    except Exception as e:
        logging.error(f'Error when fetch_inspection_list_data: {e}')
        print(f'Error when fetch_inspection_list_data: {e}')
        return False
    finally:
        close_connection(conn, server)

def fetch_inspection_list_by_id(inspection_site_id) -> list:
    conn, server = get_connection()
    try:
        with conn.cursor() as cursor:
            cursor.execute(
                """
                select
                    inspection_site_id,
                    cm.description,
                    target_id,
                    target_start_id,
                    target_end_id,
                    target_valid_id,
                    is_patrolled,
                    ci.updated_at
                from car_inspection ci
                -- where target_valid_id <> '0'
                join code_mst cm ON cm.code_mst_id = ci.inspection_site_id
                where 1=1
                    and target_valid_id <> '0'
                    and ci.inspection_site_id = %s
                    order by target_id asc;
                """, (inspection_site_id,)
            )
            data = cursor.fetchall()
            return data
    except Exception as e:
        logging.error(f'Error when fetch_nominated_car_website_inspection_list_data: {e}')
        print(f'Error when fetch_nominated_car_website_inspection_list_data: {e}')
        return False
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
