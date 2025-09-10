from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # allows frontend to call this backend

# Example: secure answer
SECRET_ANSWER = "uce tindivanam"

@app.route("/api/request_contact", methods=["POST"])
def request_contact():
    try:
        data = request.get_json()
        instagram = data.get("instagram", "").strip()
        answer = data.get("answer", "").strip().lower()

        # Check the security question
        if answer == SECRET_ANSWER:
            return jsonify({
                "message": f"Access granted for {instagram} ✅",
                "contacts": {
                    "email": "paramesh@example.com",
                    "linkedin": "https://linkedin.com/in/paramesh",
                    "github": "https://github.com/paramesh25-luv",
                    "instagram": "_p_a_r_a_m_e_s_h_25_"
                }
            }), 200
        else:
            return jsonify({
                "error": "Incorrect answer. Access denied ❌"
            }), 401
    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
