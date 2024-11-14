import psycopg2
from psycopg2.extras import RealDictCursor
from sshtunnel import SSHTunnelForwarder
from config import settings

def get_connection():
    # Set up an SSH tunnel
    # print('(settings.SSH_HOST, int(settings.SSH_PORT) =======================>',
    #       (settings.SSH_HOST, settings.SSH_PORT, settings.SSH_PRIVATE_KEY))
    server = SSHTunnelForwarder(
        (settings.SSH_HOST, int(settings.SSH_PORT)),
        ssh_username=settings.SSH_USER,
        ssh_pkey=settings.SSH_PRIVATE_KEY,
        remote_bind_address=(settings.DATABASE_HOST, int(settings.DATABASE_PORT))
    )
    server.start()

    # Connect to PostgreSQL through the tunnel
    conn = psycopg2.connect(
        host='127.0.0.1',  # This will be the local endpoint of the SSH tunnel
        port=server.local_bind_port,
        user=settings.DATABASE_USER,
        password=settings.DATABASE_PASSWORD,
        database=settings.DATABASE_NAME,
        cursor_factory=RealDictCursor
    )

    return conn, server  # Return server to close it later

def close_connection(conn, server):
    conn.close()
    server.stop()
