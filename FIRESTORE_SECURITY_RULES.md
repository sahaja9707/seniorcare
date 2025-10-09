# 🔥 Firestore Security Rules Configuration

## Problem: "Missing or insufficient permissions"

This error occurs because Firestore has default security rules that **block all access** to protect your data. You need to configure rules to allow authenticated users to access their own data.

---

## ✅ Solution: Update Firestore Security Rules

### Step 1: Open Firebase Console

1. Go to https://console.firebase.google.com/
2. Select your project: **seniorcare-f5dae**
3. Click **Firestore Database** in the left sidebar
4. Click the **Rules** tab at the top

### Step 2: Replace Default Rules

**Current Rules (blocking everything):**

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if false;  // ❌ Blocks everything
    }
  }
}
```

**New Rules (allow authenticated users):**

Copy and paste these rules into your Firebase Console:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // Users collection - users can only access their own data
    match /users/{userId} {
      // Allow read if authenticated and requesting own data
      allow read: if request.auth != null && request.auth.uid == userId;

      // Allow create if authenticated (for signup)
      allow create: if request.auth != null && request.auth.uid == userId;

      // Allow update if authenticated and updating own data
      allow update: if request.auth != null && request.auth.uid == userId;

      // Don't allow delete from client (use admin SDK only)
      allow delete: if false;
    }

    // Transactions collection - users can only access their own transactions
    match /transactions/{transactionId} {
      allow read: if request.auth != null &&
                     request.auth.uid == resource.data.userId;

      allow create: if request.auth != null &&
                       request.auth.uid == request.resource.data.userId;

      allow update, delete: if false; // Transactions are immutable
    }

    // Groceries collection - everyone can read, only admin can write
    match /groceries/{productId} {
      allow read: if true; // Anyone can browse products
      allow write: if false; // Only admin SDK can modify
    }

    // Events collection - everyone can read
    match /events/{eventId} {
      allow read: if true; // Anyone can see events
      allow create: if request.auth != null; // Authenticated users can create
      allow update: if request.auth != null &&
                       request.auth.uid == resource.data.createdBy;
      allow delete: if false;
    }
  }
}
```

### Step 3: Publish Rules

1. Click **Publish** button in Firebase Console
2. Wait for "Rules published successfully" message
3. Refresh your application at http://localhost:3000

---

## 🔐 What These Rules Do

### **Users Collection** (`/users/{userId}`)

- ✅ Users can READ their own data
- ✅ Users can CREATE their profile (signup)
- ✅ Users can UPDATE their own wallet, cart, etc.
- ❌ Users cannot DELETE (protection)
- ❌ Users cannot access other users' data

### **Transactions Collection** (`/transactions/{transactionId}`)

- ✅ Users can READ their own transactions
- ✅ Users can CREATE new transactions
- ❌ Transactions are immutable (no update/delete)

### **Groceries Collection** (`/groceries/{productId}`)

- ✅ Anyone can READ products (browse grocery store)
- ❌ Only server-side (admin SDK) can modify products

### **Events Collection** (`/events/{eventId}`)

- ✅ Anyone can READ events
- ✅ Authenticated users can CREATE events
- ✅ Users can UPDATE their own events
- ❌ Users cannot DELETE events

---

## 🧪 Test After Applying Rules

### 1. Sign Up

```
1. Go to http://localhost:3000/signup
2. Create account
3. Should redirect to dashboard ✅
```

### 2. Read User Data

```javascript
// In AuthContext, this should now work:
const userRef = doc(db, "users", uid);
const userSnap = await getDoc(userRef);
// ✅ No longer shows "Missing permissions" error
```

### 3. Wallet Operations

```
1. Go to Wallet page
2. Add money
3. Withdraw money
4. View transaction history
5. All should work ✅
```

---

## 🚨 Common Issues

### Issue: Still getting permission errors after updating rules

**Solution:**

1. Make sure you clicked **Publish** in Firebase Console
2. Wait 10-30 seconds for rules to propagate
3. Hard refresh your browser (Ctrl+Shift+R)
4. Check Firebase Console > Firestore > Rules tab shows your new rules

### Issue: "Property 'userId' is undefined"

**Solution:**
Make sure your transactions include userId field:

```typescript
{
  userId: request.auth.uid,  // ← Must include this
  amount: 100,
  type: 'deposit',
  // ... other fields
}
```

### Issue: Can't read groceries collection

**Solution:**
Current rules allow anyone to read groceries. If still blocked:

1. Check collection name is exactly `groceries` (case-sensitive)
2. Check documents exist in collection
3. Try test rule: `allow read: if true;`

---

## 📚 For Development/Testing Only

If you want to **temporarily allow all access** for testing (NOT for production):

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth != null;  // ⚠️ Development only!
    }
  }
}
```

**⚠️ WARNING:** This allows any authenticated user to read/write ALL data. Only use during development!

---

## 🔒 Production Best Practices

✅ **DO:**

- Require authentication for sensitive data
- Validate userId matches auth.uid
- Use field validation (e.g., amount > 0)
- Make transactions immutable
- Log all writes for audit trail

❌ **DON'T:**

- Allow `if true` for writes in production
- Allow users to access other users' data
- Allow deletes without admin verification
- Store sensitive data in Firestore (use Auth instead)

---

## 📖 Learn More

- [Firestore Security Rules Documentation](https://firebase.google.com/docs/firestore/security/get-started)
- [Security Rules Testing](https://firebase.google.com/docs/rules/unit-tests)
- [Common Security Rules Patterns](https://firebase.google.com/docs/firestore/security/rules-conditions)

---

## ✅ After Applying Rules

Your error **"Missing or insufficient permissions"** should disappear and:

1. ✅ Users can sign up and create their profile
2. ✅ Users can read their own wallet balance
3. ✅ Users can add/withdraw money
4. ✅ Users can view their transaction history
5. ✅ Users can browse grocery products
6. ✅ Users can view community events
7. ✅ Stack DSA operations work in wallet
8. ✅ BST search works in grocery store

---

## 🆘 If You Need Help

If you're still getting permission errors after applying these rules:

1. Check browser console for exact error message
2. Check Firebase Console > Firestore > Rules debugger
3. Verify you're authenticated (check `auth.currentUser`)
4. Check document paths match exactly (case-sensitive)

Share the exact error message and I can help debug further!
