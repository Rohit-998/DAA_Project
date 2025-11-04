
from typing import List, Dict


def merge_sort(items: List[Dict], key: str = "value") -> List[Dict]:
    if len(items) <= 1:
        return items[:]
    mid = len(items)//2
    left = merge_sort(items[:mid], key)
    right = merge_sort(items[mid:], key)
    return _merge(left, right, key)

def _merge(left, right, key):
    result = []
    i = j = 0
    while i < len(left) and j < len(right):
        if float(left[i].get(key, 0)) <= float(right[j].get(key, 0)):
            result.append(left[i]); i += 1
        else:
            result.append(right[j]); j += 1
    result.extend(left[i:])
    result.extend(right[j:])
    return result
