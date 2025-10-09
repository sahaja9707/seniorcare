import firebase_admin
from firebase_admin import credentials, firestore

cred = credentials.Certificate("serviceAccountKey.json")
firebase_admin.initialize_app(cred)
db = firestore.client()

#using binary search tree
class Node:
    def __init__(self, key, data=None):
        self.key = key  # product_name
        self.data = data  # full product data
        self.left = None
        self.right = None

def insert(root, key, data=None): #for insertion of dataset into bst
    if root is None:
        return Node(key, data)
    
    if key < root.key:
        root.left = insert(root.left, key, data)
    elif key > root.key:
        root.right = insert(root.right, key, data)
    
    return root

def search(root, key): #searching feature for users
    if root is None or root.key == key:
        return root
    if key < root.key:
        return search(root.left, key)
    else:
        return search(root.right, key)


if __name__ == "__main__":
    root = None  # start with empty BST

    # Load all products from Firestore
    products = db.collection("groceries").stream()
    for product in products:
        data = product.to_dict()
        product_name = data["Product_Name"].lower()
        root = insert(root, product_name, data)

    search_name = input("Enter product name to search: ").strip().lower()
    result = search(root, search_name)
    if result:
        print(result.data)
    else:
        print("Uh-Oh! Product not found.")

