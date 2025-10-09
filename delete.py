import firebase_admin
from firebase_admin import credentials, firestore

cred = credentials.Certificate("serviceAccountKey.json")
firebase_admin.initialize_app(cred)

db = firestore.client()
collection_ref = db.collection("groceries")
BATCH_SIZE = 100
fields_to_delete = {
    "Date_Received": firestore.DELETE_FIELD,

}

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
        doc.reference.update(fields_to_delete)
        print(f"Updated document: {doc.id}")
        total_updated += 1
    last_doc = docs[-1]

print(f"Fields deleted from {total_updated} documents.")
