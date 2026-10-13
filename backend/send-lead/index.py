import json
import os
import smtplib
import urllib.request
from datetime import datetime
from email.mime.text import MIMEText

NOTIFY_EMAIL = "89161022727@mail.ru"


def send_max(text: str) -> str:
    token = os.environ.get("MAX_BOT_TOKEN", "")
    chat_id = os.environ.get("MAX_CHAT_ID", "")
    if not token or not chat_id:
        return "max:skipped"
    try:
        req = urllib.request.Request(
            f"https://platform-api.max.ru/messages?chat_id={chat_id}",
            data=json.dumps({"text": text}).encode(),
            headers={"Content-Type": "application/json", "Authorization": token},
        )
        urllib.request.urlopen(req, timeout=8)
        return "max:ok"
    except Exception as e:
        return f"max:error:{str(e)[:60]}"


def send_email(subject: str, text: str) -> str:
    user = os.environ.get("SMTP_USER", "")
    password = os.environ.get("SMTP_PASSWORD", "")
    if not user or not password:
        return "email:skipped"
    try:
        msg = MIMEText(text, "plain", "utf-8")
        msg["Subject"] = subject
        msg["From"] = user
        msg["To"] = NOTIFY_EMAIL
        with smtplib.SMTP_SSL("smtp.mail.ru", 465, timeout=8) as s:
            s.login(user, password)
            s.sendmail(user, [NOTIFY_EMAIL], msg.as_string())
        return "email:ok"
    except Exception as e:
        return f"email:error:{str(e)[:60]}"


def handler(event: dict, context) -> dict:
    """Отправка заявки с сайта риэлтора в MAX и на почту"""
    cors = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
        "Content-Type": "application/json",
    }
    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": cors, "body": ""}
    if event.get("httpMethod") != "POST":
        return {"statusCode": 405, "headers": cors, "body": json.dumps({"error": "Method not allowed"})}

    body = json.loads(event.get("body") or "{}")
    name = body.get("name", "").strip()
    phone = body.get("phone", "").strip()
    message = body.get("message", "").strip()
    source = body.get("source", "Форма на сайте")

    if not name or not phone:
        return {"statusCode": 400, "headers": cors, "body": json.dumps({"error": "Имя и телефон обязательны"})}

    now = datetime.now().strftime("%d.%m.%Y %H:%M")
    text = (
        f"Новая заявка с сайта\n\n"
        f"Имя: {name}\n"
        f"Телефон: {phone}\n"
        f"Сообщение: {message or '—'}\n"
        f"Источник: {source}\n"
        f"Время: {now}"
    )
    results = [send_max(text), send_email("Новая заявка с сайта", text)]
    return {"statusCode": 200, "headers": cors, "body": json.dumps({"ok": True, "results": results})}
