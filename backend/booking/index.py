import json
import os
import smtplib
from datetime import datetime
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

import psycopg2

WORK_HOURS = [
    '10:00', '10:30', '11:00', '11:30', '12:00', '12:30',
    '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
    '16:00', '16:30', '17:00', '17:30', '18:00', '18:30',
]


def handler(event: dict, context) -> dict:
    """Онлайн-запись на консультацию: GET возвращает занятые слоты на дату, POST создаёт бронь и шлёт письмо владельцу"""
    method = event.get('httpMethod', 'GET')

    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-User-Id, X-Auth-Token, X-Session-Id',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }

    headers = {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'}
    dsn = os.environ.get('DATABASE_URL', '')

    if method == 'GET':
        params = event.get('queryStringParameters') or {}
        date = (params.get('date') or '').strip()
        if not date:
            return {'statusCode': 400, 'headers': headers, 'body': json.dumps({'error': 'Укажите дату'})}

        booked = []
        if dsn:
            conn = psycopg2.connect(dsn)
            try:
                with conn.cursor() as cur:
                    cur.execute(
                        "SELECT consultation_time FROM bookings WHERE consultation_date = %s",
                        (date,)
                    )
                    booked = [row[0] for row in cur.fetchall()]
            finally:
                conn.close()

        free_slots = [t for t in WORK_HOURS if t not in booked]
        return {'statusCode': 200, 'headers': headers, 'body': json.dumps({'slots': free_slots})}

    if method != 'POST':
        return {'statusCode': 405, 'headers': headers, 'body': json.dumps({'error': 'Method not allowed'})}

    body_data = json.loads(event.get('body') or '{}')
    name = (body_data.get('name') or '').strip()
    phone = (body_data.get('phone') or '').strip()
    date = (body_data.get('date') or '').strip()
    time = (body_data.get('time') or '').strip()
    message = (body_data.get('message') or '').strip()

    if not name or not phone or not date or not time:
        return {'statusCode': 400, 'headers': headers, 'body': json.dumps({'error': 'Заполните имя, телефон, дату и время'})}

    if time not in WORK_HOURS:
        return {'statusCode': 400, 'headers': headers, 'body': json.dumps({'error': 'Недопустимое время'})}

    if not dsn:
        return {'statusCode': 500, 'headers': headers, 'body': json.dumps({'error': 'База данных не настроена'})}

    conn = psycopg2.connect(dsn)
    try:
        with conn.cursor() as cur:
            cur.execute(
                "SELECT 1 FROM bookings WHERE consultation_date = %s AND consultation_time = %s",
                (date, time)
            )
            if cur.fetchone():
                return {'statusCode': 409, 'headers': headers, 'body': json.dumps({'error': 'Это время уже занято, выберите другое'})}

            cur.execute(
                "INSERT INTO bookings (name, phone, consultation_date, consultation_time, message) VALUES (%s, %s, %s, %s, %s)",
                (name, phone, date, time, message or None)
            )
        conn.commit()
    finally:
        conn.close()

    sender_email = 'zakaraevapatimat6@gmail.com'
    receiver_email = 'zakaraevapatimat6@gmail.com'
    app_password = os.environ.get('GMAIL_APP_PASSWORD', '')

    if app_password:
        try:
            date_fmt = datetime.strptime(date, '%Y-%m-%d').strftime('%d.%m.%Y')
        except ValueError:
            date_fmt = date

        msg = MIMEMultipart()
        msg['From'] = sender_email
        msg['To'] = receiver_email
        msg['Subject'] = f'Новая запись на консультацию — {name}'

        text_lines = [
            'Новая онлайн-запись на консультацию с сайта',
            '',
            f'Имя: {name}',
            f'Телефон: {phone}',
            f'Дата: {date_fmt}',
            f'Время: {time}',
        ]
        if message:
            text_lines.append(f'Ситуация: {message}')

        msg.attach(MIMEText('\n'.join(text_lines), 'plain', 'utf-8'))

        with smtplib.SMTP('smtp.gmail.com', 587) as server:
            server.starttls()
            server.login(sender_email, app_password)
            server.sendmail(sender_email, receiver_email, msg.as_string())

    return {'statusCode': 200, 'headers': headers, 'body': json.dumps({'success': True})}