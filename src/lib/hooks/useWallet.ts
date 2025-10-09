// Client-side hooks for wallet operations using Firebase Client SDK
// Integrated with Stack data structure for transaction history management
'use client';

import { useState, useEffect, useRef } from 'react';
import { db, auth } from '@/lib/firebaseClient';
import { doc, getDoc, collection, query, where, orderBy, limit, getDocs } from 'firebase/firestore';
import { TransactionManager, Transaction as StackTransaction } from '@/lib/dataStructures/TransactionManager';

export interface Transaction {
  id: string;
  userId: string;
  amount: number;
  type: 'deposit' | 'withdrawal' | 'purchase';
  description?: string;
  timestamp: string;
  items?: any[];
  balanceBefore?: number;
  balanceAfter?: number;
}

/**
 * Hook to manage wallet operations with Stack-based transaction history
 */
export function useWallet(userId?: string) {
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Stack-based transaction manager (DSA implementation)
  const transactionManager = useRef<TransactionManager>(new TransactionManager(100));
  const [stackTransactions, setStackTransactions] = useState<StackTransaction[]>([]);

  // Get current user ID from auth if not provided
  const currentUserId = userId || auth.currentUser?.uid;

  /**
   * Load wallet balance from Firestore using Client SDK
   */
  const loadBalance = async () => {
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
        setBalance(userData.wallet || 0);
      } else {
        setBalance(0);
      }
    } catch (err: any) {
      setError(err.message);
      console.error('Error loading balance:', err);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Load transaction history from Firestore using Client SDK
   * Also populates Stack data structure
   */
  const loadTransactions = async (limitCount: number = 50) => {
    if (!currentUserId) {
      setError('User not authenticated');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const transactionsRef = collection(db, 'transactions');
      const q = query(
        transactionsRef,
        where('userId', '==', currentUserId),
        orderBy('timestamp', 'desc'),
        limit(limitCount)
      );
      
      const snapshot = await getDocs(q);
      const txns = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Transaction[];

      setTransactions(txns);
      
      // Populate Stack data structure (LIFO)
      transactionManager.current.clearAll();
      // Add transactions in reverse order (oldest first) so newest is on top
      for (let i = txns.length - 1; i >= 0; i--) {
        const txn = txns[i];
        transactionManager.current.addTransaction({
          id: txn.id,
          type: txn.type === 'withdrawal' ? 'withdraw' : txn.type as 'deposit' | 'purchase',
          amount: txn.amount,
          timestamp: new Date(txn.timestamp).getTime(),
          description: txn.description || '',
          balanceAfter: txn.balanceAfter || 0,
          balanceBefore: txn.balanceBefore || 0
        });
      }
      
      // Update stack transactions state
      setStackTransactions(transactionManager.current.getAllTransactions());
    } catch (err: any) {
      setError(err.message);
      console.error('Error loading transactions:', err);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Check wallet balance via API
   */
  const checkBalance = async () => {
    if (!currentUserId) {
      setError('User not authenticated');
      return null;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`/api/wallet?userId=${currentUserId}`);
      if (!response.ok) {
        const text = await response.text();
        setError(`API error: ${response.status} - ${text}`);
        return null;
      }
      const data = await response.json();

      if (data.success) {
        setBalance(data.balance);
        return data.balance;
      } else {
        setError(data.error || 'Failed to check balance');
        return null;
      }
    } catch (err: any) {
      setError(err.message);
      console.error('Error checking balance:', err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Deposit money via API
   * Adds transaction to Stack
   */
  const deposit = async (amount: number, description?: string) => {
    if (!currentUserId) {
      setError('User not authenticated');
      return false;
    }

    if (amount <= 0) {
      setError('Amount must be greater than 0');
      return false;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await fetch('/api/wallet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: currentUserId,
          amount,
          description
        })
      });

      if (!response.ok) {
        const text = await response.text();
        setError(`API error: ${response.status} - ${text}`);
        return false;
      }

      const data = await response.json();

      if (data.success) {
        const oldBalance = balance;
        setBalance(data.newBalance);
        // Add to Stack (DSA implementation)
        const newTransaction: StackTransaction = {
          id: Date.now().toString(),
          type: 'deposit',
          amount,
          timestamp: Date.now(),
          description: description || 'Deposit',
          balanceBefore: oldBalance,
          balanceAfter: data.newBalance
        };
        transactionManager.current.addTransaction(newTransaction);
        setStackTransactions(transactionManager.current.getAllTransactions());
        await loadTransactions(); // Refresh transactions from Firestore
        return true;
      } else {
        setError(data.error || 'Failed to deposit');
        return false;
      }
    } catch (err: any) {
      setError(err.message);
      console.error('Error depositing:', err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Withdraw money via API
   * Adds transaction to Stack
   */
  const withdraw = async (amount: number, description?: string) => {
    if (!currentUserId) {
      setError('User not authenticated');
      return false;
    }

    if (amount <= 0) {
      setError('Amount must be greater than 0');
      return false;
    }

    if (amount > balance) {
      setError('Insufficient balance');
      return false;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await fetch('/api/wallet', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: currentUserId,
          amount,
          description
        })
      });

      if (!response.ok) {
        const text = await response.text();
        setError(`API error: ${response.status} - ${text}`);
        return false;
      }

      const data = await response.json();

      if (data.success) {
        const oldBalance = balance;
        setBalance(data.newBalance);
        // Add to Stack (DSA implementation)
        const newTransaction: StackTransaction = {
          id: Date.now().toString(),
          type: 'withdraw',
          amount,
          timestamp: Date.now(),
          description: description || 'Withdrawal',
          balanceBefore: oldBalance,
          balanceAfter: data.newBalance
        };
        transactionManager.current.addTransaction(newTransaction);
        setStackTransactions(transactionManager.current.getAllTransactions());
        await loadTransactions(); // Refresh transactions from Firestore
        return true;
      } else {
        setError(data.error || 'Failed to withdraw');
        return false;
      }
    } catch (err: any) {
      setError(err.message);
      console.error('Error withdrawing:', err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Get transaction history via API
   */
  const getTransactions = async (limitCount: number = 50) => {
    if (!currentUserId) {
      setError('User not authenticated');
      return [];
    }

    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        `/api/transactions?userId=${currentUserId}&limit=${limitCount}`
      );
      const data = await response.json();

      if (data.success) {
        setTransactions(data.transactions);
        return data.transactions;
      } else {
        setError(data.error || 'Failed to get transactions');
        return [];
      }
    } catch (err: any) {
      setError(err.message);
      console.error('Error getting transactions:', err);
      return [];
    } finally {
      setLoading(false);
    }
  };

  // Load balance and transactions on mount
  useEffect(() => {
    if (currentUserId) {
      loadBalance();
      loadTransactions();
    }
  }, [currentUserId]);

  /**
   * Undo last transaction using Stack (DSA operation)
   * Note: This is for demonstration - actual undo would need API support
   */
  const undoLastTransaction = () => {
    const undone = transactionManager.current.undoLastTransaction();
    if (undone) {
      setStackTransactions(transactionManager.current.getAllTransactions());
      // In real implementation, you'd call an API to reverse the transaction
      return undone;
    }
    return null;
  };

  /**
   * Redo last undone transaction using Stack (DSA operation)
   */
  const redoTransaction = () => {
    const redone = transactionManager.current.redoTransaction();
    if (redone) {
      setStackTransactions(transactionManager.current.getAllTransactions());
      return redone;
    }
    return null;
  };

  /**
   * Get transaction statistics using Stack operations
   */
  const getTransactionSummary = () => {
    return transactionManager.current.getTransactionSummary();
  };

  /**
   * Get transactions by type from Stack
   */
  const getTransactionsByType = (type: 'deposit' | 'withdraw' | 'purchase') => {
    return transactionManager.current.getTransactionsByType(type);
  };

  /**
   * Get latest transaction from Stack (peek operation)
   */
  const getLatestTransaction = () => {
    return transactionManager.current.getLatestTransaction();
  };

  const formattedBalance = `₹${balance.toFixed(2)}`;

  return {
    balance,
    formattedBalance,
    transactions,
    loading,
    error,
    checkBalance,
    deposit,
    withdraw,
    getTransactions,
    refreshBalance: loadBalance,
    refreshTransactions: loadTransactions,
    // Stack-based DSA operations
    stackTransactions,
    undoLastTransaction,
    redoTransaction,
    getTransactionSummary,
    getTransactionsByType,
    getLatestTransaction,
    transactionCount: transactionManager.current.getTransactionCount()
  };
}

/**
 * Format currency amount
 */
export function formatCurrency(amount: number): string {
  return `₹${amount.toLocaleString('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })}`;
}

/**
 * Format transaction type for display
 */
export function formatTransactionType(type: string): string {
  const types: Record<string, string> = {
    deposit: '💰 Deposit',
    withdrawal: '💸 Withdrawal',
    purchase: '🛒 Purchase'
  };
  return types[type] || type;
}

/**
 * Format timestamp for display
 */
export function formatTimestamp(timestamp: string): string {
  const date = new Date(timestamp);
  return date.toLocaleString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}
