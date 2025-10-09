# Frontend Integration Examples

This guide shows how to use the Firebase-integrated hooks in your React components.

## Setup: Wrap Your App with AuthProvider

First, update your root layout to include the AuthProvider:

```typescript
// src/app/layout.tsx
import { AuthProvider } from '@/lib/context/AuthContext';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
```

---

## 1. Using Authentication (useAuth Hook)

### Login Page Example

```typescript
'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { signIn, loading } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      await signIn(email, password);
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
        <h1 className="text-2xl font-bold">Login</h1>
        
        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded">
            {error}
          </div>
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white p-2 rounded disabled:bg-gray-400"
        >
          {loading ? 'Signing in...' : 'Sign In'}
        </button>
      </form>
    </div>
  );
}
```

### Protected Route Example

```typescript
'use client';

import { useEffect } from 'react';
import { useAuth } from '@/lib/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function ProtectedPage() {
  const { user, userData, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return null;
  }

  return (
    <div>
      <h1>Welcome, {userData?.name || user.email}!</h1>
      <p>Wallet Balance: ₹{userData?.wallet.toFixed(2)}</p>
    </div>
  );
}
```

---

## 2. Using Cart (useCart Hook)

### Grocery Page with Cart

```typescript
'use client';

import { useState, useEffect } from 'react';
import { useCart } from '@/lib/hooks/useCart';
import { useAuth } from '@/lib/context/AuthContext';
import { getAllProducts } from '@/lib/hooks/useCart';

export default function GroceryPage() {
  const { user } = useAuth();
  const { 
    cart, 
    cartItemCount, 
    loading, 
    error, 
    addToCart, 
    removeFromCart,
    getCartWithBill,
    checkout 
  } = useCart(user?.uid);
  
  const [products, setProducts] = useState<any[]>([]);
  const [bill, setBill] = useState<any>(null);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    const allProducts = await getAllProducts();
    setProducts(allProducts);
  };

  const handleAddToCart = async (productName: string) => {
    const success = await addToCart(productName, 1);
    if (success) {
      alert('Added to cart!');
    }
  };

  const handleViewCart = async () => {
    const cartBill = await getCartWithBill();
    setBill(cartBill);
  };

  const handleCheckout = async () => {
    const result = await checkout();
    if (result) {
      alert(`Order placed! New balance: ₹${result.newWalletBalance}`);
      setBill(null);
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Grocery Store</h1>
        <button 
          onClick={handleViewCart}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Cart ({cartItemCount})
        </button>
      </div>

      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
          {error}
        </div>
      )}

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {products.map((product) => (
          <div key={product.id} className="border p-4 rounded shadow">
            <h3 className="font-bold">{product.Product_Name}</h3>
            <p className="text-gray-600">{product.Unit_Price}</p>
            <p className="text-sm">Stock: {product.Stock_Quantity}</p>
            <button
              onClick={() => handleAddToCart(product.Product_Name)}
              disabled={loading || product.Stock_Quantity === 0}
              className="mt-2 bg-green-600 text-white px-4 py-2 rounded w-full disabled:bg-gray-400"
            >
              {loading ? 'Adding...' : 'Add to Cart'}
            </button>
          </div>
        ))}
      </div>

      {/* Cart Bill Modal */}
      {bill && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Your Cart</h2>
            
            {bill.items.map((item: any, index: number) => (
              <div key={index} className="flex justify-between mb-2">
                <span>{item.productName} x {item.quantity}</span>
                <span>₹{item.totalPrice.toFixed(2)}</span>
              </div>
            ))}
            
            <hr className="my-4" />
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>₹{bill.totals.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>GST (5%):</span>
                <span>₹{bill.totals.gst.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-lg">
                <span>Total:</span>
                <span>₹{bill.totals.total.toFixed(2)}</span>
              </div>
            </div>

            <div className="mt-4 flex gap-2">
              <button
                onClick={handleCheckout}
                disabled={loading}
                className="flex-1 bg-green-600 text-white px-4 py-2 rounded disabled:bg-gray-400"
              >
                {loading ? 'Processing...' : 'Checkout'}
              </button>
              <button
                onClick={() => setBill(null)}
                className="flex-1 bg-gray-600 text-white px-4 py-2 rounded"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
```

---

## 3. Using Wallet (useWallet Hook)

### Wallet Page

```typescript
'use client';

import { useState } from 'react';
import { useWallet } from '@/lib/hooks/useWallet';
import { useAuth } from '@/lib/context/AuthContext';
import { formatTimestamp, formatTransactionType } from '@/lib/hooks/useWallet';

export default function WalletPage() {
  const { user } = useAuth();
  const {
    balance,
    formattedBalance,
    transactions,
    loading,
    error,
    deposit,
    withdraw
  } = useWallet(user?.uid);

  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [operation, setOperation] = useState<'deposit' | 'withdraw'>('deposit');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const value = parseFloat(amount);

    if (isNaN(value) || value <= 0) {
      alert('Please enter a valid amount');
      return;
    }

    let success = false;
    if (operation === 'deposit') {
      success = await deposit(value, description || undefined);
    } else {
      success = await withdraw(value, description || undefined);
    }

    if (success) {
      setAmount('');
      setDescription('');
      alert(`${operation === 'deposit' ? 'Deposit' : 'Withdrawal'} successful!`);
    }
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">My Wallet</h1>

      {/* Balance Card */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6 rounded-lg shadow-lg mb-6">
        <p className="text-sm opacity-80">Current Balance</p>
        <h2 className="text-4xl font-bold">{formattedBalance}</h2>
      </div>

      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
          {error}
        </div>
      )}

      {/* Deposit/Withdraw Form */}
      <div className="bg-white border rounded-lg p-6 mb-6 shadow">
        <h3 className="text-xl font-bold mb-4">Add or Withdraw Funds</h3>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-4">
            <label className="flex items-center">
              <input
                type="radio"
                value="deposit"
                checked={operation === 'deposit'}
                onChange={() => setOperation('deposit')}
                className="mr-2"
              />
              Deposit
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                value="withdraw"
                checked={operation === 'withdraw'}
                onChange={() => setOperation('withdraw')}
                className="mr-2"
              />
              Withdraw
            </label>
          </div>

          <input
            type="number"
            placeholder="Amount (₹)"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full p-2 border rounded"
            step="0.01"
            min="0.01"
            required
          />

          <input
            type="text"
            placeholder="Description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border rounded"
          />

          <button
            type="submit"
            disabled={loading}
            className={`w-full text-white px-4 py-2 rounded disabled:bg-gray-400 ${
              operation === 'deposit' ? 'bg-green-600' : 'bg-red-600'
            }`}
          >
            {loading ? 'Processing...' : operation === 'deposit' ? 'Deposit' : 'Withdraw'}
          </button>
        </form>
      </div>

      {/* Transaction History */}
      <div className="bg-white border rounded-lg p-6 shadow">
        <h3 className="text-xl font-bold mb-4">Transaction History</h3>
        
        {transactions.length === 0 ? (
          <p className="text-gray-500">No transactions yet</p>
        ) : (
          <div className="space-y-3">
            {transactions.map((txn) => (
              <div
                key={txn.id}
                className="flex justify-between items-center p-3 border-b"
              >
                <div>
                  <p className="font-semibold">{formatTransactionType(txn.type)}</p>
                  {txn.description && (
                    <p className="text-sm text-gray-600">{txn.description}</p>
                  )}
                  <p className="text-xs text-gray-500">
                    {formatTimestamp(txn.timestamp)}
                  </p>
                </div>
                <div className={`font-bold ${
                  txn.type === 'deposit' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {txn.type === 'deposit' ? '+' : '-'}₹{txn.amount.toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
```

---

## 4. Product Search Example

```typescript
'use client';

import { useState } from 'react';
import { searchProduct } from '@/lib/hooks/useCart';

export default function ProductSearchBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const [result, setResult] = useState<any>(null);
  const [searching, setSearching] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setSearching(true);
    
    const product = await searchProduct(searchTerm);
    setResult(product);
    setSearching(false);
  };

  return (
    <div className="mb-4">
      <form onSubmit={handleSearch} className="flex gap-2">
        <input
          type="text"
          placeholder="Search for products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 p-2 border rounded"
        />
        <button
          type="submit"
          disabled={searching}
          className="bg-blue-600 text-white px-6 py-2 rounded disabled:bg-gray-400"
        >
          {searching ? 'Searching...' : 'Search'}
        </button>
      </form>

      {result && (
        <div className="mt-4 p-4 border rounded bg-white">
          <h3 className="font-bold">{result.Product_Name}</h3>
          <p>Price: {result.Unit_Price}</p>
          <p>Stock: {result.Stock_Quantity}</p>
        </div>
      )}

      {result === null && searchTerm && (
        <div className="mt-4 p-4 border rounded bg-red-50">
          Product not found
        </div>
      )}
    </div>
  );
}
```

---

## Summary

### Client-Side Files Created:
1. ✅ `src/lib/hooks/useCart.ts` - Cart operations with Firebase Client SDK
2. ✅ `src/lib/hooks/useWallet.ts` - Wallet operations with Firebase Client SDK
3. ✅ `src/lib/context/AuthContext.tsx` - Authentication context with Firebase Client SDK

### Server-Side Files (Already Created):
- All API routes use Firebase Admin SDK
- All utility libraries are shared between client and server

### Integration Points:
- **Authentication**: Firebase Auth (client) + Firestore (client)
- **Cart Operations**: API routes (server) + Firebase Client SDK (client)
- **Wallet Operations**: API routes (server) + Firebase Client SDK (client)
- **Product Search**: API routes (server) using BST algorithm

All Python functionality is now fully integrated with both Firebase Client SDK (for frontend) and Firebase Admin SDK (for backend)! 🎉
