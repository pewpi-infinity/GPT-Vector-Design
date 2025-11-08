"""
rogers.bot.py — run_rogers_bot implementation with DuckDuckGo Instant Answer integration.

Behavior:
- Returns a safe text response.
- When live data is available (DuckDuckGo), it returns a human readable string with token markup:
    [yellow:AppName]  [purple:PublicPassage]  [blue:Ready]  [green:Done]  [orange:Risk]  [red:Error]
  The client parses these bracket tokens and displays colored clickable words.
- Falls back to a friendly simulated reply when the API fails.

Place this file next to server.py and restart the Flask server.
"""
import re
import html
from typing import Any, Optional
import requests

DDG_URL = "https://api.duckduckgo.com/"

def ddg_instant_answer(query: str, timeout: float = 4.0) -> Optional[dict]:
    try:
        params = {"q": query, "format": "json", "no_html": 1, "skip_disambig": 1}
        resp = requests.get(DDG_URL, params=params, timeout=timeout)
        resp.raise_for_status()
        return resp.json()
    except Exception:
        return None

def markup_heading_as_yellow(heading: str) -> str:
    # Wrap important words of heading with [yellow:...]
    # Keep it short: only the first 4 meaningful words
    if not heading:
        return ""
    words = re.findall(r"[A-Za-z0-9\-\_']+", heading)
    words = [w for w in words if len(w) > 1]
    parts = []
    for i, w in enumerate(words[:4]):
        parts.append(f"[yellow:{html.escape(w)}]")
    # append rest of heading plain (escaped)
    rest = " ".join(words[4:]) if len(words) > 4 else ""
    return " ".join(parts) + ((" " + html.escape(rest)) if rest else "")

def topics_to_markup(topics) -> str:
    # Convert a list of topic dicts into purple tokens (short)
    out = []
    for t in topics[:6]:
        text = t.get("Text") or t.get("Name") or ""
        text = html.escape(text.strip())
        if text:
            out.append(f"[purple:{text}]")
    return " | ".join(out)

def search_duckduckgo(query: str) -> str:
    q = (query or "").strip()
    data = ddg_instant_answer(q)
    if data:
        # Prefer AbstractText
        abstract = data.get("AbstractText") or ""
        heading = data.get("Heading") or ""
        related = data.get("RelatedTopics") or []
        # short friendly result
        parts = []
        if heading:
            parts.append(markup_heading_as_yellow(heading))
        if abstract:
            parts.append(html.escape(abstract.strip()))
        # If no abstract, try related topics
        rel = []
        # RelatedTopics may be nested; extract first-level Texts
        for item in related:
            if isinstance(item, dict) and "Text" in item:
                rel.append(item["Text"])
            elif isinstance(item, dict) and "Topics" in item:
                for sub in item["Topics"][:3]:
                    if isinstance(sub, dict) and "Text" in sub:
                        rel.append(sub["Text"])
            if len(rel) >= 6:
                break
        if rel:
            # convert some to purple tokens
            parts.append(topics_to_markup([{"Text": r} for r in rel]))
        result = "\n\n".join([p for p in parts if p])
        if result:
            # add a hint token to let UI create app links from heading words
            result += "\n\n[blue:Click a yellow word to open app builder]"
            return result
    # fallback simulated response
    safe_q = html.escape(q, quote=True)
    return f"(Simulated) No live web data available for '{safe_q}'. Try a different query or check your network."

def run_rogers_bot(query: Any) -> str:
    """
    Main entrypoint used by server.py. Returns a string (may include bracket token markup).
    """
    try:
        if query is None:
            return "[red:Error] Empty query received."

        raw = str(query).strip()
        if not raw:
            return "[red:Error] Empty query received."

        low = raw.lower()

        # Meta / greetings
        if any(k in low for k in ("purpose", "admin", "status", "who are you", "what are you")):
            return ("I am Rogers, the administrative assistant. Ask me to search the web, e.g. 'search climate change', "
                    "or say 'hello' for a greeting.")

        if any(low.startswith(g) or f" {g} " in low for g in ("hello", "hi", "hey")):
            return "Hello. I am Rogers, online and operational. Try: 'search who invented the telephone'"

        # Interpret 'search' prefix
        m = re.match(r'^(search|find|lookup)\s+(.+)', raw, flags=re.I)
        phrase = m.group(2) if m else raw

        # perform DDG search attempt
        ddg_result = search_duckduckgo(phrase)
        return ddg_result

    except Exception as e:
        safe_err = html.escape(str(e), quote=True)
        return f"[red:Bot error] An internal exception occurred: {safe_err}"