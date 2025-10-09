// Wallet utility functions for managing user finances

export interface Transaction {
  id?: string;
  userId: string;
  amount: number;
  type: 'deposit' | 'withdrawal' | 'purchase';
  description?: string;
  timestamp: string;
  items?: any[];
}

export interface WalletBalance {
  userId: string;
  balance: number;
  lastUpdated: string;
}

export function validateAmount(amount: number): boolean {
  return amount > 0 && !isNaN(amount) && isFinite(amount);
}

export function calculateNewBalance(
  currentBalance: number,
  amount: number,
  type: 'deposit' | 'withdrawal'
): number {
  if (type === 'deposit') {
    return currentBalance + amount;
  } else {
    if (currentBalance < amount) {
      throw new Error('Insufficient balance');
    }
    return currentBalance - amount;
  }
}

export function formatCurrency(amount: number): string {
  return `₹${amount.toFixed(2)}`;
}

export function parsePrice(priceString: string): number {
  // Remove currency symbols and commas, extract numeric part
  const numericStr = priceString
    .replace(/[$₹,]/g, '')
    .trim();
  
  const amount = parseFloat(numericStr);
  
  if (isNaN(amount)) {
    throw new Error(`Cannot parse price: ${priceString}`);
  }
  
  return amount;
}

export function createTransaction(
  userId: string,
  amount: number,
  type: 'deposit' | 'withdrawal' | 'purchase',
  description?: string,
  items?: any[]
): Transaction {
  return {
    userId,
    amount,
    type,
    description,
    timestamp: new Date().toISOString(),
    items: items || []
  };
}
