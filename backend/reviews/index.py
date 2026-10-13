import json
import os
import urllib.request
import psycopg2


def notify_max(text: str) -> None:
    token = os.environ.get("MAX_BOT_TOKEN", "")
    chat_id = os.environ.get("MAX_CHAT_ID", "")
    if not token or not chat_id:
        return
    try:
        req = urllib.request.Request(
            f"https://platform-api.max.ru/messages?chat_id={chat_id}",
            data=json.dumps({"text": text}).encode(),
            headers={"Content-Type": "application/json", "Authorization": token},
        )
        urllib.request.urlopen(req, timeout=5)
    except Exception:
        pass


def handler(event: dict, context) -> dict:
    """Получение и добавление отзывов клиентов"""
    cors = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
        "Content-Type": "application/json",
    }
    method = event.get("httpMethod")
    if method == "OPTIONS":
        return {"statusCode": 200, "headers": cors, "body": ""}

    conn = psycopg2.connect(os.environ["DATABASE_URL"])
    cur = conn.cursor()

    if method == "POST":
        body = json.loads(event.get("body") or "{}")
        name = body.get("name", "").strip()[:100]
        text = body.get("text", "").strip()[:2000]
        stars = int(body.get("stars") or 5)
        stars = min(max(stars, 1), 5)
        if not name or not text:
            conn.close()
            return {"statusCode": 400, "headers": cors, "body": json.dumps({"error": "Имя и отзыв обязательны"})}
        cur.execute(
            "INSERT INTO reviews (name, text, stars) VALUES (%s, %s, %s)",
            (name, text, stars),
        )
        conn.commit()
        conn.close()
        notify_max(f"Новый отзыв на сайте\n\nОт: {name}\nОценка: {stars} из 5\n{text}")
        return {"statusCode": 200, "headers": cors, "body": json.dumps({"ok": True})}

    cur.execute("SELECT name, text, stars, created_at FROM reviews WHERE is_published ORDER BY created_at DESC LIMIT 50")
    months = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"]
    items = [
        {"name": r[0], "text": r[1], "stars": r[2], "date": f"{months[r[3].month - 1]} {r[3].year}"}
        for r in cur.fetchall()
    ]
    conn.close()
    return {"statusCode": 200, "headers": cors, "body": json.dumps({"reviews": items})}
