# Quick API Reference

## 🛍️ Shopping Flow

### 1. Search for Products
```bash
GET /api/products/search?name=apple
```

### 2. Add to Cart
```bash
POST /api/cart
{
  "userId": "user123",
  "productName": "Apple",
  "quantity": 2
}
```

### 3. View Cart
```bash
GET /api/cart?userId=user123
```

### 4. Checkout
```bash
POST /api/checkout
{
  "userId": "user123"
}
```

## 💰 Wallet Flow

### 1. Check Balance
```bash
GET /api/wallet?userId=user123
```

### 2. Add Money
```bash
POST /api/wallet
{
  "userId": "user123",
  "amount": 1000,
  "description": "Added funds"
}
```

### 3. View History
```bash
GET /api/transactions?userId=user123&limit=20
```

## 🔧 Admin Operations

### Convert Currency (Bulk)
```bash
POST /api/admin/operations
{
  "operation": "convertCurrency",
  "collection": "groceries",
  "field": "Unit_Price",
  "conversionRate": 88
}
```

### Delete Fields (Bulk)
```bash
POST /api/admin/operations
{
  "operation": "deleteFields",
  "collection": "groceries",
  "fields": ["Old_Field"]
}
```

## 📦 Response Format

All APIs return:
```json
{
  "success": true/false,
  "data": {...},
  "error": "error message" // if failed
}
```

## 🔗 Frontend Usage

```typescript
// React Component Example
const userId = 'user123'; // Get from auth

// Add to cart
const addItem = async (product: string, qty: number) => {
  await fetch('/api/cart', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId, productName: product, quantity: qty })
  });
};

// Checkout
const checkout = async () => {
  const res = await fetch('/api/checkout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId })
  });
  return res.json();
};
```
