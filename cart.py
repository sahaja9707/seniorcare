import firebase_admin
from firebase_admin import credentials, firestore

cred = credentials.Certificate("serviceAccountKey.json")
firebase_admin.initialize_app(cred)
db = firestore.client()
groceries_ref = db.collection("groceries")

import math
from datetime import datetime, timedelta

customer_order = {}

def add_order(product_name, quantity):
    docs = groceries_ref.where("Product_Name", "==", product_name).get()
    if not docs:
        print(f"Product not found.")
        return

    qty=int(quantity)
    if qty <= 0:
        print("Invalid quantity.")
        return

    customer_order[product_name] = customer_order.get(product_name, 0) + qty
    print(f"Added to order.")

def calculate_total():
    total = 0
    for item, qty in customer_order.items():
        docs = groceries_ref.where("Product_Name", "==", item).get()
        if docs:
            price = docs[0].to_dict().get("Unit_Price", 0)
            total += price*qty
    return total

def print_bill(cost):
    for item, qty in customer_order.items():
        docs = groceries_ref.where("Product_Name", "==", item).get()
    gst = cost * 0.05
    total = math.ceil(cost + gst)
    print(f"Subtotal: Rs.{cost:.2f}\nGST (5%): Rs.{gst:.2f}\nTotal Payable: Rs.{total}")

def update_stock(product_name, qty):
    docs = groceries_ref.where("Product_Name", "==", product_name).get()
    if not docs:
        print(f"Product not found.")
        return False
    doc = docs[0]
    data = doc.to_dict()
    new_qty = data.get("Stock_Quantity", 0) - qty
    if new_qty < 0:
        print(f"Not enough stock.")
        return False
    groceries_ref.document(doc.id).update({"Stock_Quantity": new_qty})
    print(f"Updated Firestore: {product_name} stock = {new_qty}")
    return True

def checkout():
    for item, qty in customer_order.items():
        update_stock(item, qty)
    print("Checkout complete.")
