"""
Kanishka Premium AI Portfolio
Python/Flask development server.
The original HTML, CSS, JavaScript and assets are served unchanged.
"""
import os
from flask import Flask, jsonify, send_from_directory

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
app = Flask(__name__, static_folder=BASE_DIR, static_url_path="")

@app.get("/")
def home():
    return send_from_directory(BASE_DIR, "index.html")

@app.get("/api/avatar/status")
def avatar_status():
    configured = bool(os.getenv("AVATAR_PROVIDER") and os.getenv("AVATAR_API_KEY"))
    return jsonify({
        "configured": configured,
        "provider": os.getenv("AVATAR_PROVIDER") or None,
        "message": "Add your provider credentials and implement the provider-specific video/streaming API here."
    })

@app.post("/api/avatar/generate")
def avatar_generate():
    if not os.getenv("AVATAR_API_KEY"):
        return jsonify({"error": "Avatar API is not configured. Add credentials to your environment."}), 503
    return jsonify({
        "error": "Provider adapter is not implemented. See README.md for setup notes."
    }), 501

if __name__ == "__main__":
    port = int(os.getenv("PORT", "5000"))
    print(f"Portfolio running at http://127.0.0.1:{port}")
    app.run(host="127.0.0.1", port=port, debug=True)
