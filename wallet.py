#fns - transaction history - must be linked to grocery bought by user (grocery quantity should get 
#deducted), must show item, cost, quantity
import firebase_admin
from firebase_admin import credentials, firestore

cred=credentials.Certificate("serviceAccountKey.json")
app=firebase_admin.initialize_app(cred)
db=firestore.client()
collection_ref=db.collection("wallet")

wallet = 0

users_ref = db.collection("users")

def balance_check():
    docs=users_ref.stream()
    for doc in docs:
        data=doc.to_dict()
        balance = data.get("wallet", 0)
        print(f"{doc.id} -> BALANCE: {balance}")
       
    else:
        print("User not found")
        return 0

if __name__ == "__main__":
    balance_check()

'''
def deposit(amount):
    if amount <= 0:
        print("Invalid deposit amount.")
        return
    wallet.append(amount)
    print(f"Transaction of {amount} added to wallet.")

def withdraw(amount):
    if amount <= 0:
        print("Invalid amount")
    elif balance_check() < amount:
        print("Insufficient balance.")
    else:
        wallet.append(-amount)
        print(f"Current balance: ", balance_check())
'''