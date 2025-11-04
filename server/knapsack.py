from typing import List, Dict

def knapsack_optimize(items: List[Dict], capacity: int) -> Dict:
    # Sort items by value-to-weight ratio (descending)
    items = sorted(items, key=lambda x: int(x['value']) / int(x['weight']), reverse=True)

    total_value = 0
    total_weight = 0
    selected = []

    for item in items:
        weight = int(item['weight'])
        value = int(item['value'])

        if total_weight + weight <= capacity:
        
            selected.append(item)
            total_value += value
            total_weight += weight
        else:
           
            remain = capacity - total_weight
            if remain <= 0:
                break
            fraction = remain / weight
            fractional_value = value * fraction
            fractional_item = {
                'name': item.get('name', 'unknown'),
                'weight': remain,
                'value': fractional_value,
                'fraction_taken': round(fraction, 2)
            }
            selected.append(fractional_item)
            total_value += fractional_value
            total_weight += remain
            break  

    return {
        'total_value': round(total_value, 2),
        'total_weight': round(total_weight, 2),
        'items': selected
    }
