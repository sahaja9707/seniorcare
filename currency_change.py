import firebase_admin
from firebase_admin import credentials, firestore

cred = credentials.Certificate("serviceAccountKey.json")
firebase_admin.initialize_app(cred)
db = firestore.client()

collection_ref = db.collection("groceries")
BATCH_SIZE = 100
last_doc = None
total_updated = 0

while True:
    query = collection_ref.limit(BATCH_SIZE)
    if last_doc:
        query = query.start_after(last_doc)
    docs = list(query.stream())
    if not docs:
        break
    for doc in docs:
        data = doc.to_dict() or {}
        if "Unit_Price" in data:
            value = data["Unit_Price"]
            if isinstance(value, str):
                # Remove currency symbols and commas, extract numeric part
                numeric_str = value.replace("$", "").replace("₹", "").replace(",", "").strip()
                try:
                    amount = float(numeric_str)
                    converted = amount * 88
                    new_value = f"₹{converted:.2f}"
                    collection_ref.document(doc.id).update({"Unit_Price": new_value})
                    print(f"Converted and updated document: {doc.id} -> {new_value}")
                    total_updated += 1
                except ValueError:
                    print(f"Skipped document {doc.id}: could not parse Unit_Price '{value}'")
    last_doc = docs[-1]

print(f"Updated {total_updated} documents.")