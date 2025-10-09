// Transaction Manager using Stack Data Structure
// Demonstrates LIFO operations for transaction history with undo capability

import { Stack } from './Stack';

export interface Transaction {
  id: string;
  type: 'deposit' | 'withdraw' | 'purchase';
  amount: number;
  timestamp: number;
  description: string;
  balanceAfter: number;
  balanceBefore: number;
}

export class TransactionManager {
  private transactionStack: Stack<Transaction>;
  private undoStack: Stack<Transaction>; // For undo operations
  private maxStackSize: number;

  constructor(maxStackSize: number = 100) {
    this.transactionStack = new Stack<Transaction>();
    this.undoStack = new Stack<Transaction>();
    this.maxStackSize = maxStackSize;
  }

  /**
   * Add new transaction to stack - O(1)
   */
  addTransaction(transaction: Transaction): void {
    // Enforce stack size limit (optional)
    if (this.transactionStack.getSize() >= this.maxStackSize) {
      // Remove oldest transaction (from bottom)
      const allTransactions = this.transactionStack.toArray();
      this.transactionStack.clear();
      
      // Re-add all except the oldest
      for (let i = allTransactions.length - 2; i >= 0; i--) {
        this.transactionStack.push(allTransactions[i]);
      }
    }
    
    this.transactionStack.push(transaction);
    // Clear undo stack when new transaction is added
    this.undoStack.clear();
  }

  /**
   * Get latest transaction - O(1)
   */
  getLatestTransaction(): Transaction | null {
    return this.transactionStack.peek();
  }

  /**
   * Undo last transaction - O(1)
   * Returns the undone transaction
   */
  undoLastTransaction(): Transaction | null {
    const transaction = this.transactionStack.pop();
    if (transaction) {
      this.undoStack.push(transaction);
    }
    return transaction;
  }

  /**
   * Redo last undone transaction - O(1)
   */
  redoTransaction(): Transaction | null {
    const transaction = this.undoStack.pop();
    if (transaction) {
      this.transactionStack.push(transaction);
    }
    return transaction;
  }

  /**
   * Get all transactions (latest first) - O(n)
   */
  getAllTransactions(): Transaction[] {
    return this.transactionStack.toArray();
  }

  /**
   * Get transactions of specific type - O(n)
   */
  getTransactionsByType(type: Transaction['type']): Transaction[] {
    return this.transactionStack.filter(t => t.type === type);
  }

  /**
   * Get transactions within date range - O(n)
   */
  getTransactionsByDateRange(startTime: number, endTime: number): Transaction[] {
    return this.transactionStack.filter(
      t => t.timestamp >= startTime && t.timestamp <= endTime
    );
  }

  /**
   * Calculate total for transaction type - O(n)
   */
  getTotalByType(type: Transaction['type']): number {
    const transactions = this.getTransactionsByType(type);
    return transactions.reduce((sum, t) => sum + t.amount, 0);
  }

  /**
   * Get transaction count - O(1)
   */
  getTransactionCount(): number {
    return this.transactionStack.getSize();
  }

  /**
   * Clear all transactions - O(1)
   */
  clearAll(): void {
    this.transactionStack.clear();
    this.undoStack.clear();
  }

  /**
   * Search for transaction by ID - O(n)
   */
  findTransactionById(id: string): Transaction | null {
    return this.transactionStack.search(t => t.id === id);
  }

  /**
   * Get summary statistics - O(n)
   */
  getTransactionSummary(): {
    totalDeposits: number;
    totalWithdrawals: number;
    totalPurchases: number;
    transactionCount: number;
    netChange: number;
  } {
    const all = this.getAllTransactions();
    
    const summary = {
      totalDeposits: 0,
      totalWithdrawals: 0,
      totalPurchases: 0,
      transactionCount: all.length,
      netChange: 0
    };

    all.forEach(t => {
      switch (t.type) {
        case 'deposit':
          summary.totalDeposits += t.amount;
          summary.netChange += t.amount;
          break;
        case 'withdraw':
          summary.totalWithdrawals += t.amount;
          summary.netChange -= t.amount;
          break;
        case 'purchase':
          summary.totalPurchases += t.amount;
          summary.netChange -= t.amount;
          break;
      }
    });

    return summary;
  }

  /**
   * Export transactions for persistence
   */
  exportToJSON(): string {
    return JSON.stringify(this.getAllTransactions(), null, 2);
  }

  /**
   * Import transactions from JSON
   */
  importFromJSON(json: string): void {
    try {
      const transactions: Transaction[] = JSON.parse(json);
      this.clearAll();
      
      // Add in reverse order to maintain stack structure
      for (let i = transactions.length - 1; i >= 0; i--) {
        this.transactionStack.push(transactions[i]);
      }
    } catch (error) {
      console.error('Failed to import transactions:', error);
      throw new Error('Invalid transaction data');
    }
  }
}

// Singleton instance for global transaction management
let globalTransactionManager: TransactionManager | null = null;

export function getTransactionManager(): TransactionManager {
  if (!globalTransactionManager) {
    globalTransactionManager = new TransactionManager();
  }
  return globalTransactionManager;
}

export function resetTransactionManager(): void {
  globalTransactionManager = null;
}
