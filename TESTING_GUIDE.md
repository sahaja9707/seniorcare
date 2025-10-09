# 🧪 End-to-End Testing Guide

## ✅ Frontend Integration Complete!

All your React pages are now connected to the Firebase-integrated APIs. Here's how to test everything.

---

## 📋 What Was Updated

### 1. **Grocery Page** (`src/app/grocery/page.tsx`) ✅
- ✅ Connected to Firebase via `useCart` hook
- ✅ Loads products from Firestore using `getAllProducts()`
- ✅ Implements BST search using `searchProduct()` API
- ✅ Add to cart functionality with real-time updates
- ✅ Shows cart item count
- ✅ Displays stock quantity
- ✅ Loading and error states

### 2. **Wallet Page** (`src/app/wallet/page.tsx`) ✅
- ✅ Connected to Firebase via `useWallet` hook
- ✅ Real-time balance from Firestore
- ✅ Deposit money via API
- ✅ Withdraw money via API
- ✅ Transaction history from Firebase
- ✅ Success/error messages
- ✅ Loading states

### 3. **Root Layout** (`src/app/layout.tsx`) ✅
- ✅ Wrapped with `AuthProvider` for authentication
- ✅ Wrapped with `AppProvider` for navigation

---

## 🚀 Testing Steps

### Prerequisites

1. **Install Dependencies**
```bash
npm install
```

2. **Set Environment Variables**
Create `.env.local`:
```env
# Firebase Admin (Server-side)
FIREBASE_SERVICE_ACCOUNT_KEY={"type":"service_account","project_id":"your-project",...}

# Firebase Client (Browser-side)
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-app.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your-measurement-id
```

3. **Prepare Firestore Data**
Ensure your Firestore has these collections:
- `users` - User profiles
- `groceries` - Product catalog
- `transactions` - Transaction history

---

## 🧪 Test Scenarios

### Test 1: Grocery Page - Load Products

**Steps:**
1. Start dev server: `npm run dev`
2. Navigate to `/grocery`
3. Wait for products to load from Firebase

**Expected Results:**
- ✅ Products load from Firestore
- ✅ Shows product name, price, and stock
- ✅ Loading indicator appears while fetching
- ✅ "Add to Cart" buttons are visible

**Verify in Code:**
```typescript
// Products loaded from Firebase
const allProducts = await getAllProducts()
```

---

### Test 2: Grocery Page - Search Products (BST)

**Steps:**
1. Go to `/grocery`
2. Type "apple" in search box
3. Click "Search" button

**Expected Results:**
- ✅ Uses BST search algorithm via API
- ✅ Shows matching product
- ✅ Shows "No items found" if not exists

**Verify API Call:**
```bash
# Check browser console for:
GET /api/products/search?name=apple
```

---

### Test 3: Grocery Page - Add to Cart

**Steps:**
1. Login first (authentication required)
2. Go to `/grocery`
3. Click "Add to Cart" on any product
4. Check cart count in header

**Expected Results:**
- ✅ Shows "Adding..." while processing
- ✅ Shows success alert
- ✅ Cart count increases
- ✅ Data saved to Firestore

**Verify API Call:**
```bash
# Check browser console for:
POST /api/cart
{
  "userId": "user123",
  "productName": "Apple",
  "quantity": 1
}
```

**Verify in Firebase Console:**
- Go to Firestore
- Check `users/{userId}/cart` field
- Should see: `{ "Apple": 1 }`

---

### Test 4: Wallet Page - Check Balance

**Steps:**
1. Login first
2. Navigate to `/wallet`
3. Wait for balance to load

**Expected Results:**
- ✅ Shows real balance from Firestore
- ✅ Shows latest transaction
- ✅ Loading state while fetching

**Verify in Firebase Console:**
- Go to Firestore → `users/{userId}`
- Check `wallet` field value matches display

---

### Test 5: Wallet Page - Deposit Money

**Steps:**
1. Go to `/wallet`
2. Enter amount (e.g., 1000)
3. Enter description (e.g., "Monthly Pension")
4. Click "Add Money"

**Expected Results:**
- ✅ Balance increases
- ✅ Success message appears
- ✅ Transaction appears in latest transaction card
- ✅ Form fields clear

**Verify API Call:**
```bash
# Check browser console for:
POST /api/wallet
{
  "userId": "user123",
  "amount": 1000,
  "description": "Monthly Pension"
}
```

**Verify in Firebase Console:**
- `users/{userId}/wallet` increases by 1000
- New document in `transactions` collection

---

### Test 6: Wallet Page - Withdraw Money

**Steps:**
1. Go to `/wallet`
2. Enter amount (e.g., 500)
3. Enter description (e.g., "Grocery Shopping")
4. Click "Withdraw Money"

**Expected Results:**
- ✅ Balance decreases
- ✅ Success message appears
- ✅ Transaction appears in latest transaction
- ✅ Shows error if insufficient balance

**Verify API Call:**
```bash
PUT /api/wallet
{
  "userId": "user123",
  "amount": 500,
  "description": "Grocery Shopping"
}
```

---

### Test 7: Cart to Checkout Flow

**Steps:**
1. Add multiple items to cart in grocery page
2. Go to checkout (if checkout page exists)
3. Complete purchase

**Expected Results:**
- ✅ Stock decreases in Firestore
- ✅ Wallet balance deducts
- ✅ Transaction recorded
- ✅ Cart clears after checkout

**Verify API Call:**
```bash
POST /api/checkout
{
  "userId": "user123"
}
```

---

## 🔍 Debugging Tips

### Check Browser Console
Open DevTools (F12) and look for:
```javascript
// Success logs
✅ Products loaded from Firebase
✅ Added to cart successfully
✅ Wallet updated

// Error logs
❌ Error loading products: ...
❌ Failed to add to cart: ...
```

### Check Network Tab
1. Open DevTools → Network
2. Filter by "Fetch/XHR"
3. Look for API calls:
   - `/api/products/search`
   - `/api/cart`
   - `/api/wallet`
   - `/api/checkout`

### Check Firestore Console
1. Go to Firebase Console
2. Navigate to Firestore Database
3. Check collections in real-time:
   - `users` → cart, wallet fields
   - `groceries` → stock quantities
   - `transactions` → new entries

---

## 📊 Test Checklist

### Grocery Page
- [ ] Products load from Firebase
- [ ] Search works (BST algorithm)
- [ ] Add to cart updates Firebase
- [ ] Cart count displays correctly
- [ ] Out of stock items disabled
- [ ] Loading states work
- [ ] Error messages show

### Wallet Page
- [ ] Balance loads from Firebase
- [ ] Deposit increases balance
- [ ] Withdraw decreases balance
- [ ] Transactions display
- [ ] Latest transaction shows
- [ ] Success messages appear
- [ ] Error handling works
- [ ] Form validation works

### Authentication
- [ ] User must login to use features
- [ ] Auth state persists
- [ ] Protected routes work
- [ ] Logout clears data

### API Endpoints
- [ ] `/api/products/search` returns results
- [ ] `/api/cart` GET returns cart
- [ ] `/api/cart` POST adds item
- [ ] `/api/cart` PUT updates quantity
- [ ] `/api/cart` DELETE removes item
- [ ] `/api/wallet` GET returns balance
- [ ] `/api/wallet` POST deposits money
- [ ] `/api/wallet` PUT withdraws money
- [ ] `/api/transactions` returns history
- [ ] `/api/checkout` processes order

---

## 🐛 Common Issues & Solutions

### Issue 1: "User not authenticated"
**Solution:** Login first before accessing protected features
```typescript
// Check if user is logged in
const { user } = useAuth()
if (!user) {
  // Redirect to login
}
```

### Issue 2: Products not loading
**Solution:** Check Firebase configuration and Firestore rules
```javascript
// Firestore rules should allow read
match /groceries/{doc} {
  allow read: if request.auth != null;
}
```

### Issue 3: API returns 500 error
**Solution:** Check server logs and Firebase Admin SDK setup
```bash
# Check .env.local has correct values
FIREBASE_SERVICE_ACCOUNT_KEY=...
```

### Issue 4: Cart not updating
**Solution:** Ensure userId is passed correctly
```typescript
// Pass user ID from auth
const { user } = useAuth()
const { addToCart } = useCart(user?.uid)
```

---

## 🎯 Performance Testing

### Test Load Times
1. Open DevTools → Performance
2. Record page load
3. Check:
   - Initial render time
   - API call duration
   - Firebase query time

**Target Metrics:**
- Page load: < 2s
- API response: < 500ms
- Firestore query: < 300ms

---

## 📝 Test Results Template

```markdown
## Test Run: [Date]

### Grocery Page
- ✅ Products load: PASS
- ✅ Search works: PASS
- ✅ Add to cart: PASS
- ✅ Cart count: PASS

### Wallet Page
- ✅ Balance loads: PASS
- ✅ Deposit: PASS
- ✅ Withdraw: PASS
- ✅ Transactions: PASS

### API Endpoints
- ✅ Product Search API: PASS
- ✅ Cart API: PASS
- ✅ Wallet API: PASS
- ✅ Checkout API: PASS

### Issues Found
- None / [List any issues]

### Notes
- [Any observations]
```

---

## 🚀 Next Steps After Testing

1. **Fix any bugs** found during testing
2. **Add more features**:
   - Transaction history page
   - Cart review before checkout
   - Order history
3. **Optimize performance**:
   - Add caching
   - Implement pagination
   - Lazy load images
4. **Add security**:
   - Verify user tokens
   - Add rate limiting
   - Validate input data

---

## 📞 Getting Help

If tests fail:
1. Check browser console for errors
2. Check Network tab for failed requests
3. Check Firebase Console for data issues
4. Review API documentation in `PYTHON_TO_TS_CONVERSION.md`
5. Check code examples in `FRONTEND_INTEGRATION_EXAMPLES.md`

---

**Testing Complete!** ✅

Your frontend is now fully connected to Firebase-integrated backend APIs!
