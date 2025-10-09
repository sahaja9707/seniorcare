# Python to TypeScript Conversion - API Documentation

All Python functions have been converted to TypeScript and integrated with your Next.js/Firebase app. Here's how to use them:

## 📁 File Structure

### Libraries (Utilities)
- `src/lib/bst.ts` - Binary Search Tree for product search
- `src/lib/cart.ts` - Shopping cart utilities
- `src/lib/wallet.ts` - Wallet management utilities
- `src/lib/currency.ts` - Currency conversion utilities

### API Routes
- `src/app/api/products/search/route.ts` - Product search using BST
- `src/app/api/cart/route.ts` - Cart management (CRUD operations)
- `src/app/api/checkout/route.ts` - Checkout and stock updates
- `src/app/api/wallet/route.ts` - Wallet operations (deposit/withdraw)
- `src/app/api/transactions/route.ts` - Transaction history
- `src/app/api/admin/operations/route.ts` - Admin utilities (currency conversion, field deletion)

---

## 🔍 1. Product Search (BST)

**Endpoint:** `GET /api/products/search?name={productName}`

**Purpose:** Search for products using Binary Search Tree algorithm (converted from `bst.py`)

**Example:**
```javascript
// Frontend usage
const response = await fetch('/api/products/search?name=apple');
const data = await response.json();

if (data.success) {
  console.log('Product found:', data.product);
} else {
  console.log('Product not found');
}
```

---

## 🛒 2. Cart Management

**Converted from:** `cart.py`

### Get Cart
**Endpoint:** `GET /api/cart?userId={userId}`

```javascript
const response = await fetch('/api/cart?userId=user123');
const data = await response.json();
// Returns: { success, cart, bill: { items, totals } }
```

### Add to Cart
**Endpoint:** `POST /api/cart`

```javascript
const response = await fetch('/api/cart', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    userId: 'user123',
    productName: 'Apple',
    quantity: 2
  })
});
```

### Update Cart Quantity
**Endpoint:** `PUT /api/cart`

```javascript
const response = await fetch('/api/cart', {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    userId: 'user123',
    productName: 'Apple',
    quantity: 5  // Set to 0 to remove item
  })
});
```

### Remove from Cart
**Endpoint:** `DELETE /api/cart?userId={userId}&productName={productName}`

```javascript
// Remove specific item
await fetch('/api/cart?userId=user123&productName=Apple', {
  method: 'DELETE'
});

// Clear entire cart
await fetch('/api/cart?userId=user123', {
  method: 'DELETE'
});
```

---

## 💳 3. Checkout

**Endpoint:** `POST /api/checkout`

**Purpose:** Process checkout, update stock, deduct wallet balance, create transaction history

```javascript
const response = await fetch('/api/checkout', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    userId: 'user123'
  })
});

const data = await response.json();
if (data.success) {
  console.log('Order placed!');
  console.log('Bill:', data.bill);
  console.log('New wallet balance:', data.newWalletBalance);
}
```

**Features:**
- ✅ Checks stock availability
- ✅ Verifies wallet balance
- ✅ Updates product stock
- ✅ Deducts payment from wallet
- ✅ Creates transaction record
- ✅ Clears cart after successful checkout

---

## 💰 4. Wallet Management

**Converted from:** `wallet.py`

### Check Balance
**Endpoint:** `GET /api/wallet?userId={userId}`

```javascript
const response = await fetch('/api/wallet?userId=user123');
const data = await response.json();
// Returns: { success, userId, balance, formatted: "₹1000.00" }
```

### Deposit Money
**Endpoint:** `POST /api/wallet`

```javascript
const response = await fetch('/api/wallet', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    userId: 'user123',
    amount: 500,
    description: 'Added funds'
  })
});
```

### Withdraw Money
**Endpoint:** `PUT /api/wallet`

```javascript
const response = await fetch('/api/wallet', {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    userId: 'user123',
    amount: 200,
    description: 'Withdrew funds'
  })
});
```

---

## 📊 5. Transaction History

**Endpoint:** `GET /api/transactions?userId={userId}&limit=50`

```javascript
const response = await fetch('/api/transactions?userId=user123&limit=20');
const data = await response.json();

if (data.success) {
  data.transactions.forEach(txn => {
    console.log(`${txn.type}: ₹${txn.amount} on ${txn.timestamp}`);
  });
}
```

---

## 🔧 6. Admin Operations

**Converted from:** `currency_change.py` and `delete.py`

### Currency Conversion (Bulk)
**Endpoint:** `POST /api/admin/operations`

```javascript
const response = await fetch('/api/admin/operations', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    operation: 'convertCurrency',
    collection: 'groceries',
    field: 'Unit_Price',
    conversionRate: 88,  // USD to INR
    batchSize: 100
  })
});
```

### Delete Fields (Bulk)
**Endpoint:** `POST /api/admin/operations`

```javascript
const response = await fetch('/api/admin/operations', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    operation: 'deleteFields',
    collection: 'groceries',
    fields: ['Date_Received', 'Old_Field'],
    batchSize: 100
  })
});
```

---

## 🎯 Integration with Frontend Pages

### Example: Using in Grocery Page

```typescript
// src/app/grocery/page.tsx
'use client';

import { useState, useEffect } from 'react';

export default function GroceryPage() {
  const [cart, setCart] = useState({});
  const [products, setProducts] = useState([]);
  const userId = 'user123'; // Get from auth context

  // Search product
  const searchProduct = async (name: string) => {
    const res = await fetch(`/api/products/search?name=${name}`);
    const data = await res.json();
    return data.product;
  };

  // Add to cart
  const addToCart = async (productName: string, quantity: number) => {
    const res = await fetch('/api/cart', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, productName, quantity })
    });
    
    if (res.ok) {
      loadCart(); // Refresh cart
    }
  };

  // Load cart
  const loadCart = async () => {
    const res = await fetch(`/api/cart?userId=${userId}`);
    const data = await res.json();
    setCart(data.cart);
  };

  // Checkout
  const handleCheckout = async () => {
    const res = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId })
    });
    
    const data = await res.json();
    if (data.success) {
      alert('Order placed successfully!');
      loadCart(); // Cart will be empty after checkout
    }
  };

  return (
    <div>
      {/* Your UI here */}
    </div>
  );
}
```

### Example: Using in Wallet Page

```typescript
// src/app/wallet/page.tsx
'use client';

import { useState, useEffect } from 'react';

export default function WalletPage() {
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const userId = 'user123'; // Get from auth context

  useEffect(() => {
    loadBalance();
    loadTransactions();
  }, []);

  const loadBalance = async () => {
    const res = await fetch(`/api/wallet?userId=${userId}`);
    const data = await res.json();
    setBalance(data.balance);
  };

  const loadTransactions = async () => {
    const res = await fetch(`/api/transactions?userId=${userId}`);
    const data = await res.json();
    setTransactions(data.transactions);
  };

  const deposit = async (amount: number) => {
    const res = await fetch('/api/wallet', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, amount })
    });
    
    if (res.ok) {
      loadBalance();
      loadTransactions();
    }
  };

  return (
    <div>
      <h1>Balance: ₹{balance.toFixed(2)}</h1>
      {/* Your UI here */}
    </div>
  );
}
```

---

## 🔐 Firestore Data Structure

### Users Collection
```json
{
  "userId": {
    "email": "user@example.com",
    "name": "John Doe",
    "wallet": 1000,
    "cart": {
      "Apple": 2,
      "Banana": 3
    }
  }
}
```

### Groceries Collection
```json
{
  "productId": {
    "Product_Name": "Apple",
    "Unit_Price": "₹88.00",
    "Stock_Quantity": 100,
    "Category": "Fruits"
  }
}
```

### Transactions Collection
```json
{
  "transactionId": {
    "userId": "user123",
    "type": "purchase",
    "amount": 500,
    "items": [...],
    "subtotal": 476.19,
    "gst": 23.81,
    "total": 500,
    "timestamp": "2025-10-09T12:00:00Z"
  }
}
```

---

## ✅ What's Been Converted

| Python File | TypeScript Library | API Route | Status |
|------------|-------------------|-----------|--------|
| `bst.py` | `src/lib/bst.ts` | `/api/products/search` | ✅ |
| `cart.py` | `src/lib/cart.ts` | `/api/cart`, `/api/checkout` | ✅ |
| `wallet.py` | `src/lib/wallet.ts` | `/api/wallet`, `/api/transactions` | ✅ |
| `currency_change.py` | `src/lib/currency.ts` | `/api/admin/operations` | ✅ |
| `delete.py` | - | `/api/admin/operations` | ✅ |

---

## 🚀 Next Steps

1. **Update your frontend pages** to use these API endpoints
2. **Test each endpoint** with your Firebase data
3. **Add authentication** to protect routes (check userId from session)
4. **Add error handling** in your UI components
5. **Create loading states** for better UX

All Python functionality is now integrated with your Next.js app! 🎉
