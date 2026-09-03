import json
import os

import psycopg2

VALID_STATUSES = {'new', 'in_progress', 'closed'}


def handler(event: dict, context) -> dict:
    """Панель управления заявками: проверка пароля, список заявок с формы и записей на консультацию, смена статуса заявки"""
    method = event.get('httpMethod', 'GET')

    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-Admin-Password',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }

    headers = {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'}

    admin_password = os.environ.get('ADMIN_PASSWORD', '')
    req_password = event.get('headers', {}).get('X-Admin-Password') or event.get('headers', {}).get('x-admin-password') or ''

    if not admin_password or req_password != admin_password:
        return {'statusCode': 401, 'headers': headers, 'body': json.dumps({'error': 'Неверный пароль'})}

    dsn = os.environ.get('DATABASE_URL', '')
    if not dsn:
        return {'statusCode': 500, 'headers': headers, 'body': json.dumps({'error': 'База данных не настроена'})}

    if method == 'GET':
        conn = psycopg2.connect(dsn)
        try:
            with conn.cursor() as cur:
                cur.execute(
                    "SELECT id, name, phone, message, status, created_at FROM contact_requests ORDER BY created_at DESC"
                )
                requests = [
                    {
                        'id': row[0],
                        'name': row[1],
                        'phone': row[2],
                        'message': row[3],
                        'status': row[4],
                        'created_at': row[5].isoformat(),
                    }
                    for row in cur.fetchall()
                ]

                cur.execute(
                    "SELECT id, name, phone, email, consultation_date, consultation_time, message, status, created_at "
                    "FROM bookings ORDER BY created_at DESC"
                )
                bookings = [
                    {
                        'id': row[0],
                        'name': row[1],
                        'phone': row[2],
                        'email': row[3],
                        'date': row[4].isoformat(),
                        'time': row[5],
                        'message': row[6],
                        'status': row[7],
                        'created_at': row[8].isoformat(),
                    }
                    for row in cur.fetchall()
                ]
        finally:
            conn.close()

        return {'statusCode': 200, 'headers': headers, 'body': json.dumps({'requests': requests, 'bookings': bookings})}

    if method == 'PUT':
        body_data = json.loads(event.get('body') or '{}')
        req_id = body_data.get('id')
        status = (body_data.get('status') or '').strip()

        if not req_id or status not in VALID_STATUSES:
            return {'statusCode': 400, 'headers': headers, 'body': json.dumps({'error': 'Некорректные данные'})}

        conn = psycopg2.connect(dsn)
        try:
            with conn.cursor() as cur:
                cur.execute(
                    "UPDATE contact_requests SET status = %s WHERE id = %s",
                    (status, req_id)
                )
            conn.commit()
        finally:
            conn.close()

        return {'statusCode': 200, 'headers': headers, 'body': json.dumps({'success': True})}

    return {'statusCode': 405, 'headers': headers, 'body': json.dumps({'error': 'Method not allowed'})}
