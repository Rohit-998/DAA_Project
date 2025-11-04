
from typing import List, Dict, Optional

def linear_search(items: List[Dict], name: str):

    needle = name.strip().lower()
    for it in items:
        if needle and needle in it.get('name', '').lower():
            return it
    return None
