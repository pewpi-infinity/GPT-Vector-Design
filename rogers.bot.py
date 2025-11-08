"""
Rogers Administrative Bot (rogers.bot.py)
Safe, minimal run_rogers_bot(query) entrypoint for the Flask server.

Replace your current rogers.bot.py / rogers.bot.py content with this file,
then restart the Flask server.
"""
import re
import html
from typing import Any

def search_duckduckgo(query: str) -> str:
    """Simulated search / admin responder. Escapes output for safety."""
    q = (query or "").strip()
    low = q.lower()

    if "purpose" in low:
        return "I am the Rogers Administrative Twin Bot, designed to oversee and coordinate system functions and communications."
    if "hello" in low or low in ("hi", "hey"):
        return "Hello. I am Rogers, online and operational. How may I assist you?"
    # Generic simulated response, escape original query
    safe_q = html.escape(q, quote=True)
    return (
        f"Query '{safe_q}' received. Simulating a system query and returning a placeholder result. Status: OK."
    )

def run_rogers_bot(query: Any) -> str:
    """
    Main entrypoint called by server.py.
    Accepts any input, coerces to string, routes simple commands,
    and returns a plain string. Catches exceptions and returns an error message.
    """
    try:
        if query is None:
            return "Error: empty query received."

        raw = str(query).strip()
        if not raw:
            return "Error: empty query received."

        low = raw.lower()

        # Admin / meta queries
        if any(k in low for k in ("purpose", "admin", "status", "who are you", "what are you")):
            return search_duckduckgo(raw)

        # Greetings
        if any(low.startswith(g) or f" {g} " in low for g in ("hello", "hi", "hey")):
            return search_duckduckgo(raw)

        # Simple search commands: "search ...", "find ..."
        m = re.match(r'^(search|find|lookup)\s+(.+)', raw, flags=re.I)
        if m:
            return search_duckduckgo(m.group(2))

        # Simulate action commands "run: do something" (do NOT execute shell commands)
        if low.startswith("run:") or low.startswith("exec:"):
            action = raw.split(":", 1)[1].strip() if ":" in raw else ""
            safe_action = html.escape(action, quote=True)
            return f"Simulated execution of action '{safe_action}'. Result: simulated success."

        # Default echo with safe escaping
        safe_raw = html.escape(raw, quote=True)
        return f"Rogers received: '{safe_raw}'. This request will be processed by administrative logic (simulation)."

    except Exception as e:
        # Never leak raw stack traces to the client
        safe_err = html.escape(str(e), quote=True)
        return f"Bot error: an internal exception occurred: {safe_err}"