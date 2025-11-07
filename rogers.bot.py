import requests
import html
import re
import random

# --- CORE BOT FUNCTION ---

def run_rogers_bot(query):
    """
    The "presidential twin computer brain" that decides what to do.
    It simulates performing a search and providing a structured response.
    
    This function must be runnable and return a string.
    """
    
    # Simple check for administrative/direct commands
    if "status" in query.lower() or "check" in query.lower():
        return "My current status is: Operational. All system modules are online, awaiting further requests."
    
    if "admin" in query.lower() or "authorize" in query.lower():
        # Placeholder for future multi-bot authorization logic
        return "Authorization request received. Awaiting authentication from primary user. Status: Pending."

    # If it's a general query, perform a DuckDuckGo search (simulating web lookup)
    return perform_web_search(query)


# --- WEB SEARCH MODULE (Internal Tool) ---

def perform_web_search(query):
    """
    Performs a DuckDuckGo search to ground the response in external information.
    """
    search_url = f"https://html.duckduckgo.com/html/?q={requests.utils.quote(query)}"
    
    try:
        # Step 1: Perform the search
        response = requests.get(search_url, timeout=10)
        response.raise_for_status() 
        
        # Step 2: Extract snippets
        # Searches for title (result__a) and snippet (result__snippet)
        snippet_pattern = re.compile(r'<a.*?class="result__a".*?>(.*?)<\/a>.*?<span.*?class="result__snippet".*?>(.*?)<\/span>', re.DOTALL)
        
        snippets = []
        for match in snippet_pattern.finditer(response.text):
            title = html.unescape(match.group(1).strip())
            snippet = html.unescape(match.group(2).strip())
            snippets.append(f"<li>**{title}**: {snippet}</li>")
            if len(snippets) >= 3:
                break
        
        if not snippets:
            return f"The administrative brain could not find any immediate web results for **'{query}'**. Please refine the request."

        results_list = "\n".join(snippets)
        
        # Presidential twin response based on search results
        response_template = random.choice([
            "Based on immediate data access, the following information is relevant to your query:",
            "Authorization successful. Here are the top data points found:",
            "Acknowledged. Scanning core archives... search results are as follows:"
        ])
        
        return f"{response_template}\n<ul>{results_list}</ul>"

    except requests.exceptions.RequestException:
        return "System Warning: A network failure occurred. Cannot access external resources (DuckDuckGo)."
    except Exception as e:
        return f"Core Bot Exception: An unexpected error occurred in the search module. Error: {str(e)}"