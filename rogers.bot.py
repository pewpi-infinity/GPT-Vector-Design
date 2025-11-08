"""
Safe Rogers bot entrypoint used by server.py.

Expose run_rogers_bot(query) -> str
This file is defensive: it never raises uncaught exceptions and always returns simple text.
Do NOT put secrets in this file.
"""
import re
import html
from typing import Any

def _safe_text(s: Any) -> str:
    try:
        return html.escape(str(s), quote=True)
    except Exception:
        return "<?>"

def _admin_responses(q: str) -> str:
    low = q.lower()
    if any(k in low for k in ("purpose", "who are you", "what are you", "identity")):
        return "Rogers: administrative assistant for this system. I handle queries and simulated actions."
    if any(g in low for g in ("hello", "hi", "hey")):
        return "Hello. I am Rogers. How can I assist you?"
    if "status" in low and ("server" in low or "system" in low):
        return "System status: simulated OK. For live status, query /api/status."
    return None

def run_rogers_bot(query: Any) -> str:
    """
    Called by server code. Accepts any input and returns a safe string.
    Keep logic simple: greetings, search-like inputs, simulated exec, otherwise echo.
    """
    try:
        if query is None:
            return "Error: empty query received."
        raw = str(query).strip()
        if raw == "":
            return "Error: empty query received."

        # Admin/greeting shortcuts
        admin = _admin_responses(raw)
        if admin:
            return admin

        # "search" or "find" commands -> simulated response
        m = re.match(r'^(search|find|lookup)\s+(.+)$', raw, flags=re.I)
        if m:
            subject = _safe_text(m.group(2))
            return f"Simulated search results for '{subject}': (sample) item1, item2."

        # "run: <action>" or "exec: <action>" -> simulate success (do NOT execute)
        if raw.lower().startswith(("run:", "exec:")):
            action = _safe_text(raw.split(":",1)[1].strip() if ":" in raw else "")
            return f"Simulated execution of '{action}'. Result: simulated success."

        # Default echo/backoff
        safe = _safe_text(raw)
        return f"Rogers received: '{safe}'. This will be handled by administrative logic (simulation)."

    except Exception as e:
        # Always return a safe message on error
        err = _safe_text(str(e))
        return f"Bot error: internal exception: {err}"