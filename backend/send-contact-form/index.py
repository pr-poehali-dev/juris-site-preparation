import json
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


def handler(event: dict, context) -> dict:
    """Принимает заявку с формы обратной связи сайта и отправляет её на email владельца через SMTP (Gmail)"""
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

    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': headers,
            'body': json.dumps({'error': 'Method not allowed'})
        }

    body_data = json.loads(event.get('body') or '{}')
    name = (body_data.get('name') or '').strip()
    phone = (body_data.get('phone') or '').strip()
    message = (body_data.get('message') or '').strip()

    if not name or not phone:
        return {
            'statusCode': 400,
            'headers': headers,
            'body': json.dumps({'error': 'Укажите имя и телефон'})
        }

    sender_email = 'zakaraevapatimat6@gmail.com'
    receiver_email = 'zakaraevapatimat6@gmail.com'
    app_password = os.environ.get('GMAIL_APP_PASSWORD', '')

    if not app_password:
        return {
            'statusCode': 500,
            'headers': headers,
            'body': json.dumps({'error': 'Отправка почты не настроена'})
        }

    msg = MIMEMultipart()
    msg['From'] = sender_email
    msg['To'] = receiver_email
    msg['Subject'] = f'Новая заявка с сайта — {name}'

    text_lines = [
        'Новая заявка с формы обратной связи сайта',
        '',
        f'Имя: {name}',
        f'Телефон: {phone}',
    ]
    if message:
        text_lines.append(f'Ситуация: {message}')

    msg.attach(MIMEText('\n'.join(text_lines), 'plain', 'utf-8'))

    with smtplib.SMTP('smtp.gmail.com', 587) as server:
        server.starttls()
        server.login(sender_email, app_password)
        server.sendmail(sender_email, receiver_email, msg.as_string())

    return {
        'statusCode': 200,
        'headers': headers,
        'body': json.dumps({'success': True})
    }
