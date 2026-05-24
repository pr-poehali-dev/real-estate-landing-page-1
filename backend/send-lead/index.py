import json
import os
import urllib.request
import urllib.parse
import urllib.error
from datetime import datetime


def handler(event: dict, context) -> dict:
    """Отправка заявки с сайта риэлтора в Telegram и на email"""

    cors_headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
        "Content-Type": "application/json",
    }

    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": cors_headers, "body": ""}

    if event.get("httpMethod") != "POST":
        return {"statusCode": 405, "headers": cors_headers, "body": json.dumps({"error": "Method not allowed"})}

    body = json.loads(event.get("body") or "{}")
    name = body.get("name", "").strip()
    phone = body.get("phone", "").strip()
    message = body.get("message", "").strip()
    source = body.get("source", "Форма на сайте")

    if not name or not phone:
        return {"statusCode": 400, "headers": cors_headers, "body": json.dumps({"error": "Имя и телефон обязательны"})}

    now = datetime.now().strftime("%d.%m.%Y %H:%M")
    text = (
        f"🏠 *Новая заявка с сайта*\n\n"
        f"👤 *Имя:* {name}\n"
        f"📞 *Телефон:* {phone}\n"
        f"💬 *Сообщение:* {message or '—'}\n"
        f"📍 *Источник:* {source}\n"
        f"🕐 *Время:* {now}"
    )

    results = []

    # Telegram
    tg_token = os.environ.get("TELEGRAM_BOT_TOKEN", "")
    tg_chat = os.environ.get("TELEGRAM_CHAT_ID", "")
    if tg_token and tg_chat:
        try:
            tg_url = f"https://api.telegram.org/bot{tg_token}/sendMessage"
            tg_data = json.dumps({"chat_id": tg_chat, "text": text, "parse_mode": "Markdown"}).encode()
            req = urllib.request.Request(tg_url, data=tg_data, headers={"Content-Type": "application/json"})
            urllib.request.urlopen(req, timeout=10)
            results.append("telegram:ok")
        except Exception as e:
            results.append(f"telegram:error:{str(e)[:50]}")

    return {
        "statusCode": 200,
        "headers": cors_headers,
        "body": json.dumps({"ok": True, "results": results}),
    }
