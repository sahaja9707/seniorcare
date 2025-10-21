// Client-side hooks for cart operations using Firebase Client SDK
'use client';

import { useState, useEffect } from 'react';
import { db, auth } from '@/lib/firebaseClient';
import { doc, getDoc, updateDoc, collection, query, where, getDocs } from 'firebase/firestore';

export interface CartItem {
  productName: string;
  quantity: number;
  unitPrice?: number;
  totalPrice?: number;
}

export interface CartBill {
  items: Array<{
    productName: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
  }>;
  totals: {
    subtotal: number;
    gst: number;
    total: number;
  };
}

/**
 * Hook to manage cart operations
 */
export function useCart(userId?: string) {
  const [cart, setCart] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Get current user ID from auth if not provided
  const currentUserId = userId || auth.currentUser?.uid;

  /**
   * Load cart from Firestore using Client SDK
   */
  const loadCart = async () => {
    if (!currentUserId) {
      setError('User not authenticated');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const userRef = doc(db, 'users', currentUserId);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const userData = userSnap.data();
        setCart(userData.cart || {});
      } else {
        setCart({});
      }
    } catch (err: any) {
      setError(err.message);
      console.error('Error loading cart:', err);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Add item to cart via API
   */
  const addToCart = async (productName: string, quantity: number) => {
    if (!currentUserId) {
      setError('User not authenticated');
      return false;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await fetch('/api/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: currentUserId,
          productName,
          quantity
        })
      });

      const data = await response.json();

      if (data.success) {
        setCart(data.cart);
        return true;
      } else {
        setError(data.error || 'Failed to add to cart');
        return false;
      }
    } catch (err: any) {
      setError(err.message);
      console.error('Error adding to cart:', err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Update cart item quantity via API
   */
  const updateQuantity = async (productName: string, quantity: number) => {
    if (!currentUserId) {
      setError('User not authenticated');
      return false;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await fetch('/api/cart', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: currentUserId,
          productName,
          quantity
        })
      });

      const data = await response.json();

      if (data.success) {
        setCart(data.cart);
        return true;
      } else {
        setError(data.error || 'Failed to update cart');
        return false;
      }
    } catch (err: any) {
      setError(err.message);
      console.error('Error updating cart:', err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Remove item from cart via API
   */
  const removeFromCart = async (productName: string) => {
    if (!currentUserId) {
      setError('User not authenticated');
      return false;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        `/api/cart?userId=${currentUserId}&productName=${productName}`,
        { method: 'DELETE' }
      );

      const data = await response.json();

      if (data.success) {
        setCart(data.cart);
        return true;
      } else {
        setError(data.error || 'Failed to remove from cart');
        return false;
      }
    } catch (err: any) {
      setError(err.message);
      console.error('Error removing from cart:', err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Clear entire cart via API
   */
  const clearCart = async () => {
    if (!currentUserId) {
      setError('User not authenticated');
      return false;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`/api/cart?userId=${currentUserId}`, {
        method: 'DELETE'
      });

      const data = await response.json();

      if (data.success) {
        setCart({});
        return true;
      } else {
        setError(data.error || 'Failed to clear cart');
        return false;
      }
    } catch (err: any) {
      setError(err.message);
      console.error('Error clearing cart:', err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Get cart with calculated bill via API
   */
  const getCartWithBill = async (): Promise<CartBill | null> => {
    if (!currentUserId) {
      setError('User not authenticated');
      return null;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`/api/cart?userId=${currentUserId}`);
      const data = await response.json();

      if (data.success) {
        return data.bill;
      } else {
        setError(data.error || 'Failed to get cart bill');
        return null;
      }
    } catch (err: any) {
      setError(err.message);
      console.error('Error getting cart bill:', err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Checkout via API
   */
  const checkout = async () => {
    if (!currentUserId) {
      setError('User not authenticated');
      return null;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: currentUserId })
      });

      const data = await response.json();

      if (data.success) {
        setCart({}); // Clear local cart
        return data;
      } else {
        setError(data.error || 'Checkout failed');
        return null;
      }
    } catch (err: any) {
      setError(err.message);
      console.error('Error during checkout:', err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Load cart on mount
  useEffect(() => {
    if (currentUserId) {
      loadCart();
    }
  }, [currentUserId]);

  const cartItemCount = Object.values(cart).reduce((sum, qty) => sum + qty, 0);

  return {
    cart,
    cartItemCount,
    loading,
    error,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    getCartWithBill,
    checkout,
    refreshCart: loadCart
  };
}

/**
 * Search for products using BST via API with partial key matching
 */
export async function searchProduct(productName: string) {
  try {
    const response = await fetch(
      `/api/products/search?name=${encodeURIComponent(productName)}`
    );
    const data = await response.json();

    if (data.success && data.products) {
      return data.products;
    } else {
      return [];
    }
  } catch (error) {
    console.error('Error searching product:', error);
    return [];
  }
}

/**
 * Get all products from Firestore using Client SDK
 */
export async function getAllProducts() {
  try {
    const productsRef = collection(db, 'groceries');
    const snapshot = await getDocs(productsRef);
    
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error getting products:', error);
    return [];
  }
}

/**
 * Get products by category using Client SDK
 */
export async function getProductsByCategory(category: string) {
  try {
    const productsRef = collection(db, 'groceries');
    const q = query(productsRef, where('Category', '==', category));
    const snapshot = await getDocs(q);
    
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error getting products by category:', error);
    return [];
  }
}
