from flask import Flask, request, jsonify
import secrets, time

app = Flask(__name__)

# Temporary in-memory store
temp_links = {}

@app.route("/api/request_contact", methods=["POST"])
def request_contact():
    data = request.json
    handle = data.get("handle")
    answer = data.get("answer")

    if answer.lower().strip() == "anna university":
        token = secrets.token_urlsafe(8)
        expiry = time.time() + 86400  # valid 24 hours
        temp_links[token] = {"contact": "paramesh@example.com", "expiry": expiry}
        return jsonify({"status": "verified", "link": f"/api/get_contact/{token}"})
    else:
        return jsonify({"status": "failed", "message": "Verification failed"})

@app.route("/api/get_contact/<token>", methods=["GET"])
def get_contact(token):
    record = temp_links.get(token)
    if record and record["expiry"] > time.time():
        return jsonify({"email": record["contact"]})
    else:
        return jsonify({"error": "Link expired or invalid"})

@app.route("/", methods=["GET"])
def home():
    return {"message": "Jarvis Contact API Running 🚀"}

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
