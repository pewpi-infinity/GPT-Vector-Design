"""
Safe Rogers Administrative Bot (rogers.bot.py)
Provides run_rogers_bot(query) for the Flask server.
"""
import re
import html
from typing import Any

def search_duckduckgo(query: str) -> str:
    q = (query or "").strip()
    low = q.lower()
    if "purpose" in low:
        return "I am the Rogers Administrative Twin Bot, designed to oversee and coordinate system functions and communications."
    if "hello" in low or low in ("hi", "hey"):
        return "Hello. I am Rogers, online and operational. How may I assist you?"
    safe_q = html.escape(q, quote=True)
    return f"Query '{safe_q}' received. Simulated search/handoff to administrative logic. Status: OK."

def run_rogers_bot(query: Any) -> str:
    try:
        if query is None:
            return "Error: empty query received."
        raw = str(query).strip()
        if not raw:
            return "Error: empty query received."
        low = raw.lower()
        if any(k in low for k in ("purpose", "admin", "status", "who are you", "what are you")):
            return search_duckduckgo(raw)
        if any(low.startswith(g) or f" {g} " in low for g in ("hello", "hi", "hey")):
            return search_duckduckgo(raw)
        m = re.match(r'^(search|find|lookup)\s+(.+)', raw, flags=re.I)
        if m:
            return search_duckduckgo(m.group(2))
        if low.startswith("run:") or low.startswith("exec:"):
            action = raw.split(":", 1)[1].strip() if ":" in raw else ""
            safe_action = html.escape(action, quote=True)
            return f"Simulated execution of '{safe_action}'. Result: simulated success."
        safe_raw = html.escape(raw, quote=True)
        return f"Rogers received: '{safe_raw}'. This request will be processed by administrative logic (simulation)."
    except Exception as e:
        safe_err = html.escape(str(e), quote=True)
        return f"Bot error: an internal exception occurred: {safe_err}"