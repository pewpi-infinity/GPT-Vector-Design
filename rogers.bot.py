"""
Safe Rogers Administrative Bot entrypoint.

This module exposes run_rogers_bot(query) which the Flask server will import.
It's defensive: it accepts any input, never raises uncaught exceptions,
and always returns a simple string response safe for the web UI.
"""
import re
import html
from typing import Any

def search_duckduckgo(query: str) -> str:
    """Simulated safe 'search' response; escapes user text."""
    q = (query or "").strip()
    low = q.lower()
    if "purpose" in low:
        return "I am the Rogers Administrative Twin Bot, designed to oversee and coordinate system functions and communications."
    if "hello" in low or low in ("hi", "hey"):
        return "Hello. I am Rogers, online and operational. How may I assist you?"
    safe_q = html.escape(q, quote=True)
    return f"Query '{safe_q}' received. Simulated search/handoff to administrative logic. Status: OK."

def run_rogers_bot(query: Any) -> str:
    """
    Main entrypoint used by server.py.
    - Converts input to text
    - Routes simple commands (greeting, search, run:)
    - Returns a plain string (never throws)
    """
    try:
        if query is None:
            return "Error: empty query received."
        raw = str(query).strip()
        if not raw:
            return "Error: empty query received."

        low = raw.lower()

        # Greetings / admin queries
        if any(k in low for k in ("purpose", "admin", "status", "who are you", "what are you")):
            return search_duckduckgo(raw)
        if any(low.startswith(g) or f" {g} " in low for g in ("hello", "hi", "hey")):
            return search_duckduckgo(raw)

        # Simple search commands: "search foo", "find foo"
        m = re.match(r'^(search|find|lookup)\s+(.+)', raw, flags=re.I)
        if m:
            return search_duckduckgo(m.group(2))

        # Simulate "run: something" or "exec: something" (do NOT execute)
        if low.startswith("run:") or low.startswith("exec:"):
            action = raw.split(":", 1)[1].strip() if ":" in raw else ""
            safe_action = html.escape(action, quote=True)
            return f"Simulated execution of '{safe_action}'. Result: simulated success."

        # Default: echo safely
        safe_raw = html.escape(raw, quote=True)
        return f"Rogers received: '{safe_raw}'. This request will be processed by administrative logic (simulation)."

    except Exception as e:
        safe_err = html.escape(str(e), quote=True)
        return f"Bot error: an internal exception occurred: {safe_err}"