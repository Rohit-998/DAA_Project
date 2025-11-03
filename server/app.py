# backend/app.py
from flask import Flask, jsonify, request
from flask_cors import CORS
from knapsack import knapsack_optimize
from sorting import quick_sort, merge_sort
from search import linear_search
import json
import os

app = Flask(__name__)
CORS(app)

DATA_PATH = os.path.join(os.path.dirname(__file__), "data.json")
with open(DATA_PATH, "r") as f:
    ITEMS = json.load(f)

@app.route("/api/items", methods=["GET"])
def get_items():
    return jsonify(ITEMS)

@app.route("/api/knapsack", methods=["POST"])
def optimize_knapsack():
    payload = request.json or {}
    capacity = int(payload.get("capacity", 10))
  
    items = payload.get("items", ITEMS)
    result = knapsack_optimize(items, capacity)
    return jsonify(result)

@app.route("/api/sort", methods=["POST"])
def sort_items():
    payload = request.json or {}
    key = payload.get("key", "value")
    method = payload.get("method", "quick")
    items = payload.get("items", ITEMS)
    if method == "merge":
        sorted_items = merge_sort(items, key)
    else:
        sorted_items = quick_sort(items, key)
    return jsonify(sorted_items)

@app.route("/api/search", methods=["POST"])
def find_item():
    payload = request.json or {}
    name = payload.get("name", "")
    items = payload.get("items", ITEMS)
    found = linear_search(items, name)
    return jsonify(found if found is not None else {})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
