"""
rogers.bot.py — run_rogers_bot implementation with DuckDuckGo Instant Answer integration.

Safe: never raises uncaught exceptions, uses timeouts, falls back to simulated responses.
"""
import re
import html
import requests
from typing import Any

DDG_URL = "https://api.duckduckgo.com/"

def ddg_instant_answer(query: str, timeout=5):
    try:
        params = {"q": query, "format": "json", "no_html": 1, "skip_disambig": 1}
        resp = requests.get(DDG_URL, params=params, timeout=timeout)
        resp.raise_for_status()
        data = resp.json()
        # Prefer AbstractText (concise answer)
        abstract = data.get("AbstractText")
        if abstract:
            return abstract.strip()
        # If no abstract, collect some RelatedTopics titles
        topics = data.get("RelatedTopics", []) or []
        items = []
        for t in topics:
            # Some RelatedTopics entries are dicts with "Text" or nested with "Topics"
            if isinstance(t, dict):
                if "Text" in t:
                    items.append(t["Text"])
                elif "Topics" in t and isinstance(t["Topics"], list):
                    for sub in t["Topics"][:3]:
                        if isinstance(sub, dict) and "Text" in sub:
                            items.append(sub["Text"])
            if len(items) >= 6:
                break
        if items:
            return "Related: " + " | ".join(items[:6])
        # Fallback: short URL or heading
        heading = data.get("Heading") or ""
        if heading:
            return f"Result: {heading}"
        return None
    except Exception:
        return None

def search_duckduckgo(query: str) -> str:
    q = (query or "").strip()
    # try live instant answer
    ans = ddg_instant_answer(q)
    if ans:
        # escape to be safe, return readable text
        return html.escape(ans, quote=True)
    # fallback to simulated reply
    safe_q = html.escape(q, quote=True)
    return f"(Simulated) Query '{safe_q}' received. No live answer available."

def run_rogers_bot(query: Any) -> str:
    try:
        if query is None:
            return "Error: empty query received."
        raw = str(query).strip()
        if not raw:
            return "Error: empty query received."
        low = raw.lower()
        # Greetings / admin
        if any(k in low for k in ("purpose", "admin", "status", "who are you", "what are you")):
            return "I am Rogers Administrative Bot. Ask me something to search the web."
        if any(low.startswith(g) or f" {g} " in low for g in ("hello", "hi", "hey")):
            return "Hello. I am Rogers, online and operational. How may I assist you?"
        # Accept plain queries and perform a web/instant search
        # If user said "search X" strip keyword
        m = re.match(r'^(search|find|lookup)\s+(.+)', raw, flags=re.I)
        phrase = m.group(2) if m else raw
        return search_duckduckgo(phrase)
    except Exception as e:
        return f"Bot error: an internal exception occurred: {html.escape(str(e), quote=True)}"