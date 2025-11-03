# backend/knapsack.py
from typing import List, Dict, Tuple

def knapsack_optimize(items: List[Dict], capacity: int) -> Dict:
    """
    0/1 Knapsack dynamic programming implementation.
    items: list of {'name': str, 'weight': int, 'value': int}
    capacity: int
    returns: {'total_value': int, 'total_weight': int, 'items': [...]}
    """
    n = len(items)
    # dp table (n+1) x (capacity+1)
    dp = [[0] * (capacity + 1) for _ in range(n + 1)]
    for i in range(1, n + 1):
        wt = int(items[i-1]['weight'])
        val = int(items[i-1]['value'])
        for w in range(capacity + 1):
            if wt <= w:
                dp[i][w] = max(dp[i-1][w], dp[i-1][w-wt] + val)
            else:
                dp[i][w] = dp[i-1][w]

    # find selected items
    w = capacity
    selected = []
    for i in range(n, 0, -1):
        if dp[i][w] != dp[i-1][w]:
            selected.append(items[i-1])
            w -= int(items[i-1]['weight'])

    selected.reverse()
    total_value = dp[n][capacity]
    total_weight = sum(int(it['weight']) for it in selected)
    return {
        'total_value': int(total_value),
        'total_weight': int(total_weight),
        'items': selected
    }
