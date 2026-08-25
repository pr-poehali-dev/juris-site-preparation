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

OWNER_EMAIL = 'zakaraevapatimat6@gmail.com'


def format_date(date: str) -> str:
    try:
        return datetime.strptime(date, '%Y-%m-%d').strftime('%d.%m.%Y')
    except ValueError:
        return date


def send_email(to_email: str, subject: str, lines: list):
    app_password = os.environ.get('GMAIL_APP_PASSWORD', '')
    if not app_password or not to_email:
        return

    msg = MIMEMultipart()
    msg['From'] = OWNER_EMAIL
    msg['To'] = to_email
    msg['Subject'] = subject
    msg.attach(MIMEText('\n'.join(lines), 'plain', 'utf-8'))

    try:
        with smtplib.SMTP('smtp.gmail.com', 587) as server:
            server.starttls()
            server.login(OWNER_EMAIL, app_password)
            server.sendmail(OWNER_EMAIL, to_email, msg.as_string())
    except smtplib.SMTPException:
        pass


def handler(event: dict, context) -> dict:
    """Онлайн-запись на консультацию: GET — свободные слоты или данные брони по токену, POST — создать бронь, PUT — перенести, DELETE — отменить"""
    method = event.get('httpMethod', 'GET')

    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-User-Id, X-Auth-Token, X-Session-Id',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }

    headers = {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'}
    dsn = os.environ.get('DATABASE_URL', '')
    params = event.get('queryStringParameters') or {}
    token = (params.get('token') or '').strip()

    if method == 'GET' and token:
        if not dsn:
            return {'statusCode': 500, 'headers': headers, 'body': json.dumps({'error': 'База данных не настроена'})}
        conn = psycopg2.connect(dsn)
        try:
            with conn.cursor() as cur:
                cur.execute(
                    "SELECT name, phone, email, consultation_date, consultation_time, message, status "
                    "FROM bookings WHERE manage_token = %s",
                    (token,)
                )
                row = cur.fetchone()
        finally:
            conn.close()

        if not row:
            return {'statusCode': 404, 'headers': headers, 'body': json.dumps({'error': 'Запись не найдена'})}

        booking = {
            'name': row[0],
            'phone': row[1],
            'email': row[2],
            'date': row[3].isoformat(),
            'time': row[4],
            'message': row[5],
            'status': row[6],
        }
        return {'statusCode': 200, 'headers': headers, 'body': json.dumps(booking)}

    if method == 'GET':
        date = (params.get('date') or '').strip()
        if not date:
            return {'statusCode': 400, 'headers': headers, 'body': json.dumps({'error': 'Укажите дату'})}

        booked = []
        if dsn:
            conn = psycopg2.connect(dsn)
            try:
                with conn.cursor() as cur:
                    cur.execute(
                        "SELECT consultation_time FROM bookings WHERE consultation_date = %s AND status = 'confirmed'",
                        (date,)
                    )
                    booked = [row[0] for row in cur.fetchall()]
            finally:
                conn.close()

        free_slots = [t for t in WORK_HOURS if t not in booked]
        return {'statusCode': 200, 'headers': headers, 'body': json.dumps({'slots': free_slots})}

    if method == 'DELETE':
        if not token:
            return {'statusCode': 400, 'headers': headers, 'body': json.dumps({'error': 'Не указан токен записи'})}
        if not dsn:
            return {'statusCode': 500, 'headers': headers, 'body': json.dumps({'error': 'База данных не настроена'})}

        conn = psycopg2.connect(dsn)
        try:
            with conn.cursor() as cur:
                cur.execute(
                    "SELECT name, email, consultation_date, consultation_time FROM bookings "
                    "WHERE manage_token = %s AND status = 'confirmed'",
                    (token,)
                )
                row = cur.fetchone()
                if not row:
                    return {'statusCode': 404, 'headers': headers, 'body': json.dumps({'error': 'Запись не найдена или уже отменена'})}

                cur.execute("UPDATE bookings SET status = 'cancelled' WHERE manage_token = %s", (token,))
            conn.commit()
        finally:
            conn.close()

        client_name, client_email, b_date, b_time = row
        date_fmt = format_date(b_date.isoformat())

        send_email(
            OWNER_EMAIL,
            f'Отмена записи на консультацию — {client_name}',
            ['Клиент отменил запись на консультацию', '', f'Имя: {client_name}', f'Дата: {date_fmt}', f'Время: {b_time}']
        )
        send_email(
            client_email,
            'Ваша запись на консультацию отменена',
            [f'Здравствуйте, {client_name}!', '', f'Ваша запись на {date_fmt} в {b_time} отменена.', '',
             'Если это ошибка или вы хотите записаться снова — просто оставьте новую заявку на сайте.']
        )
        return {'statusCode': 200, 'headers': headers, 'body': json.dumps({'success': True})}

    if method == 'PUT':
        if not token:
            return {'statusCode': 400, 'headers': headers, 'body': json.dumps({'error': 'Не указан токен записи'})}

        body_data = json.loads(event.get('body') or '{}')
        new_date = (body_data.get('date') or '').strip()
        new_time = (body_data.get('time') or '').strip()

        if not new_date or not new_time:
            return {'statusCode': 400, 'headers': headers, 'body': json.dumps({'error': 'Укажите новую дату и время'})}
        if new_time not in WORK_HOURS:
            return {'statusCode': 400, 'headers': headers, 'body': json.dumps({'error': 'Недопустимое время'})}
        if not dsn:
            return {'statusCode': 500, 'headers': headers, 'body': json.dumps({'error': 'База данных не настроена'})}

        conn = psycopg2.connect(dsn)
        try:
            with conn.cursor() as cur:
                cur.execute(
                    "SELECT name, phone, email FROM bookings WHERE manage_token = %s AND status = 'confirmed'",
                    (token,)
                )
                row = cur.fetchone()
                if not row:
                    return {'statusCode': 404, 'headers': headers, 'body': json.dumps({'error': 'Запись не найдена или отменена'})}

                cur.execute(
                    "SELECT 1 FROM bookings WHERE consultation_date = %s AND consultation_time = %s "
                    "AND status = 'confirmed' AND manage_token != %s",
                    (new_date, new_time, token)
                )
                if cur.fetchone():
                    return {'statusCode': 409, 'headers': headers, 'body': json.dumps({'error': 'Это время уже занято, выберите другое'})}

                cur.execute(
                    "UPDATE bookings SET consultation_date = %s, consultation_time = %s WHERE manage_token = %s",
                    (new_date, new_time, token)
                )
            conn.commit()
        finally:
            conn.close()

        client_name, client_phone, client_email = row
        date_fmt = format_date(new_date)

        send_email(
            OWNER_EMAIL,
            f'Перенос записи на консультацию — {client_name}',
            ['Клиент перенёс запись на консультацию', '', f'Имя: {client_name}', f'Телефон: {client_phone}',
             f'Новая дата: {date_fmt}', f'Новое время: {new_time}']
        )
        send_email(
            client_email,
            'Ваша запись перенесена',
            [f'Здравствуйте, {client_name}!', '', f'Ваша запись перенесена на {date_fmt} в {new_time}.']
        )
        return {'statusCode': 200, 'headers': headers, 'body': json.dumps({'success': True})}

    if method != 'POST':
        return {'statusCode': 405, 'headers': headers, 'body': json.dumps({'error': 'Method not allowed'})}

    body_data = json.loads(event.get('body') or '{}')
    name = (body_data.get('name') or '').strip()
    phone = (body_data.get('phone') or '').strip()
    email = (body_data.get('email') or '').strip()
    date = (body_data.get('date') or '').strip()
    time = (body_data.get('time') or '').strip()
    message = (body_data.get('message') or '').strip()
    origin = (body_data.get('origin') or '').strip()

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
                "SELECT 1 FROM bookings WHERE consultation_date = %s AND consultation_time = %s AND status = 'confirmed'",
                (date, time)
            )
            if cur.fetchone():
                return {'statusCode': 409, 'headers': headers, 'body': json.dumps({'error': 'Это время уже занято, выберите другое'})}

            cur.execute(
                "INSERT INTO bookings (name, phone, email, consultation_date, consultation_time, message) "
                "VALUES (%s, %s, %s, %s, %s, %s) RETURNING manage_token",
                (name, phone, email or None, date, time, message or None)
            )
            manage_token = cur.fetchone()[0]
        conn.commit()
    finally:
        conn.close()

    date_fmt = format_date(date)
    manage_url = f'{origin}/booking-manage?token={manage_token}' if origin else ''

    owner_lines = [
        'Новая онлайн-запись на консультацию с сайта',
        '',
        f'Имя: {name}',
        f'Телефон: {phone}',
        f'Дата: {date_fmt}',
        f'Время: {time}',
    ]
    if message:
        owner_lines.append(f'Ситуация: {message}')
    send_email(OWNER_EMAIL, f'Новая запись на консультацию — {name}', owner_lines)

    if email:
        client_lines = [
            f'Здравствуйте, {name}!',
            '',
            f'Вы записаны на консультацию: {date_fmt} в {time}.',
            '',
        ]
        if manage_url:
            client_lines.append(f'Отменить или перенести запись можно по ссылке: {manage_url}')
        send_email(email, 'Подтверждение записи на консультацию', client_lines)

    return {
        'statusCode': 200,
        'headers': headers,
        'body': json.dumps({'success': True, 'manageToken': str(manage_token)})
    }