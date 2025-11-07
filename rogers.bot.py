"""
Rogers Administrative Bot - run_rogers_bot entrypoint.

This module provides a simple, safe, easily-replaceable implementation of
the Rogers "administrative twin brain" logic. The server expects a callable
named `run_rogers_bot(query)` that returns a string response.

Drop this file alongside your server.py and restart the Flask process.
"""
import re
import html
import requests  # optional: kept for future real web calls
from typing import Any

__all__ = ["run_rogers_bot"]


def search_duckduckgo(query: str) -> str:
    """
    Simulated DuckDuckGo search / admin responder.

    In a production system this could call a real search API or other services.
    This stub returns deterministic, escaped text suitable for the web UI.
    """
    q = (query or "").strip().lower()

    if "purpose" in q:
        return "I am the Rogers Administrative Twin Bot, designed to oversee and coordinate system functions and communications, serving as the central intelligence hub."
    if "hello" in q or "hi " in q or q == "hi":
        return "Hello. I am Rogers, online and operational. How may I assist you?"
    # Generic simulated search response; escape the original query to be safe
    safe_q = html.escape(query, quote=True)
    return (
        f"Query '{safe_q}' received. Simulating a system search and returning a placeholder result: "
        "The requested information is being processed by internal logic. Status: OK."
    )


def run_rogers_bot(query: Any) -> str:
    """
    Main entry point called by the Flask server.

    - Accepts a query (any object; coerces to string).
    - Routes simple keywords to admin/search behavior.
    - Returns a plain string that the API will jsonify.
    - Never raises: any exception is caught and converted to a user-visible message.
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

        # Simple search-like queries
        if low.startswith("search ") or low.startswith("find ") or low.startswith("lookup "):
            # remove the command keyword to get the search phrase
            phrase = re.sub(r'^(search|find|lookup)\s+', '', raw, flags=re.I)
            return search_duckduckgo(phrase)

        # Action simulation: pretend to run a system action when prefixed with "run:" or "exec:"
        if low.startswith("run:") or low.startswith("exec:"):
            action = raw.split(":", 1)[1].strip() if ":" in raw else ""
            safe_action = html.escape(action)
            # Simulate an "action", do NOT actually execute shell commands here.
            return f"Simulated execution of action '{safe_action}'. Result: simulated success."

        # Default behavior: echo and indicate handoff to administrative logic
        safe_raw = html.escape(raw, quote=True)
        return f"Rogers received: '{safe_raw}'. This request will be processed by administrative logic (simulation)."

    except Exception as e:
        # Never propagate internal exceptions to the caller in raw form
        safe_err = html.escape(str(e), quote=True)
        return f"Bot error: an internal exception occurred: {safe_err}"