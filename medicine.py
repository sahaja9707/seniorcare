#using priority queues for medicine reminders
#is part of user collection (cause it has diff fields)
#fns - add medicine, delete medicine, view medicines, view next medicine to take
#take care of expiry dates too (import datetime)

import firebase_admin
from firebase_admin import credentials, firestore
import heapq
from datetime import datetime, timedelta

# Initialize Firebase
cred = credentials.Certificate("serviceAccountKey.json")
firebase_admin.initialize_app(cred)
db = firestore.client()

# Reference to user medicines collection
user_id = "user1"
med_ref = db.collection("users").document(user_id).collection("medicines")

# Priority queue (min-heap)
medicine_queue = []

def load_medicines():
    """Fetch medicines from Firestore and push them into priority queue based on next reminder time."""
    docs = med_ref.stream()
    for doc in docs:
        data = doc.to_dict()
        name = data.get("name")
        times = data.get("times", [])
        if times:
            for t in times:
                # Combine today's date + time
                next_time = datetime.strptime(t, "%H:%M").replace(
                    year=datetime.now().year,
                    month=datetime.now().month,
                    day=datetime.now().day
                )
                # If time has already passed, set to next day
                if next_time < datetime.now():
                    next_time += timedelta(days=1)
                # Push (priority, medicine_name, time)
                heapq.heappush(medicine_queue, (next_time, name))
    print("Medicines loaded into priority queue.")

def show_upcoming_medicines():
    """Display medicines sorted by next reminder time."""
    print("\nUpcoming Reminders:")
    for t, name in sorted(medicine_queue):
        print(f"{name} → {t.strftime('%Y-%m-%d %H:%M')}")

def get_next_medicine():
    """Return and remove the medicine with the earliest time."""
    if not medicine_queue:
        print("No medicines in queue.")
        return
    next_med = heapq.heappop(medicine_queue)
    print(f"\n🔔 Next medicine: {next_med[1]} at {next_med[0].strftime('%H:%M')}")
    return next_med

def add_medicine(name, dosage, frequency, times):
    """Add new medicine to Firestore and queue."""
    med_ref.add({
        "name": name,
        "dosage": dosage,
        "frequency": frequency,
        "times": times
    })
    print(f"Added {name} to Firestore and queue.")
    load_medicines()  # Reload to refresh priority queue

# Example usage
load_medicines()
show_upcoming_medicines()
get_next_medicine()