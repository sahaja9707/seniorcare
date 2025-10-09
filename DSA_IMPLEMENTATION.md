# Data Structures Implementation in SeniorCare

## Overview

This document explains the Data Structures & Algorithms (DSA) implementations in the SeniorCare application, specifically focused on demonstrating key computer science concepts.

---

## 1. Binary Search Tree (BST) - Product Search

### Location

- `src/lib/bst.ts`
- `src/app/api/products/search/route.ts`

### Purpose

Efficient product searching in the grocery module using Binary Search Tree algorithm.

### Time Complexity

- **Insert**: O(log n) average, O(n) worst case
- **Search**: O(log n) average, O(n) worst case
- **Space**: O(n) for storing all products

### Implementation Details

```typescript
class BSTNode {
  value: Product;
  left: BSTNode | null;
  right: BSTNode | null;
}
```

**Key Operations:**

1. `insert(node, product)` - Adds products maintaining BST property
2. `search(node, name)` - Finds product by name efficiently
3. `buildBSTFromProducts(products)` - Constructs balanced tree from array

### Why BST?

- Faster than linear search (O(n))
- Better than hash maps for range queries and sorted traversal
- Demonstrates tree-based data structure concepts
- Real-world application in database indexing

### Example Usage

```typescript
// Build BST from grocery products
const root = buildBSTFromProducts(allProducts);

// Search for "milk" - O(log n) operation
const product = search(root, "milk");
```

---

## 2. Stack - Transaction History Management

### Location

- `src/lib/dataStructures/Stack.ts`
- `src/lib/dataStructures/TransactionManager.ts`
- `src/lib/hooks/useWallet.ts`

### Purpose

Manage wallet transaction history using LIFO (Last In, First Out) principle, enabling undo/redo functionality.

### Time Complexity

- **Push**: O(1) - Add transaction to top
- **Pop**: O(1) - Remove last transaction
- **Peek**: O(1) - View latest transaction
- **Search**: O(n) - Find specific transaction
- **Space**: O(n) for n transactions

### Implementation Details

```typescript
class Stack<T> {
  private top: StackNode<T> | null;
  private size: number;

  push(data: T): void {
    /* Add to top */
  }
  pop(): T | null {
    /* Remove from top */
  }
  peek(): T | null {
    /* View top */
  }
  isEmpty(): boolean {
    /* Check if empty */
  }
}
```

**Key Operations:**

1. `push(transaction)` - Add new transaction to top of stack
2. `pop()` - Remove and return latest transaction (for undo)
3. `peek()` - View latest transaction without removing
4. `toArray()` - Get all transactions (top to bottom)
5. `filter(predicate)` - Search within stack

### Why Stack?

- **LIFO nature** matches transaction history (newest first)
- **Undo functionality** - Pop removes last transaction
- **Memory efficient** - Linked list implementation uses minimal memory
- **Real-world analogy** - Like a stack of plates, newest on top
- **Demonstrates fundamental DSA concept** - One of the core data structures

### Transaction Manager Features

```typescript
class TransactionManager {
  private transactionStack: Stack<Transaction>;
  private undoStack: Stack<Transaction>;

  addTransaction(txn): void {
    /* Push to stack */
  }
  undoLastTransaction(): Transaction | null {
    /* Pop from stack */
  }
  redoTransaction(): Transaction | null {
    /* Redo undone txn */
  }
  getTransactionSummary(): Stats {
    /* Calculate totals */
  }
}
```

**Advanced Features:**

- **Undo/Redo Stack** - Two stacks for complete undo history
- **Transaction Statistics** - Calculate totals by type in O(n)
- **Date Range Filtering** - Filter transactions by timestamp
- **Type-based Queries** - Get all deposits, withdrawals, or purchases
- **Size Limiting** - Maintain max 100 transactions to prevent memory issues

### Example Usage

```typescript
// In wallet hook
const transactionManager = new TransactionManager(100);

// Deposit money - adds to stack
await deposit(1000, "Salary");
// Stack: [Deposit: ₹1000] ← top

// Withdraw money - adds to stack
await withdraw(200, "Groceries");
// Stack: [Withdraw: ₹200, Deposit: ₹1000] ← top

// Undo last transaction
const undone = undoLastTransaction();
// Stack: [Deposit: ₹1000] ← top
// Undo Stack: [Withdraw: ₹200] ← top

// View latest without removing
const latest = getLatestTransaction();
// Returns: Deposit ₹1000

// Get summary statistics - O(n)
const summary = getTransactionSummary();
// Returns: { totalDeposits: 1000, totalWithdrawals: 0, netChange: 1000 }
```

---

## 3. Comparison with Python Implementation

### Original Python DSA

Your project originally had Python files implementing DSA:

1. **`bst.py`** - Binary Search Tree for product management
2. **`cart.py`** - Shopping cart with list operations
3. **`wallet.py`** - Wallet with stack-like transaction history
4. **`delete.py`** - Bulk deletion operations

### Migration to TypeScript

All Python DSA logic has been **converted to TypeScript** and **integrated with Firebase**:

| Python File | TypeScript Equivalent                                       | DSA Used           |
| ----------- | ----------------------------------------------------------- | ------------------ |
| `bst.py`    | `src/lib/bst.ts`                                            | Binary Search Tree |
| `cart.py`   | `src/lib/cart.ts`                                           | Array operations   |
| `wallet.py` | `src/lib/dataStructures/Stack.ts` + `TransactionManager.ts` | Stack (LIFO)       |
| `delete.py` | `src/app/api/admin/operations/route.ts`                     | Batch processing   |

---

## 4. DSA Demonstration in UI

### Wallet Page Stack Visualization

The wallet page (`src/app/wallet/page.tsx`) includes a **collapsible DSA panel** that shows:

1. **Transaction Count** - Stack size (O(1) operation)
2. **LIFO Operations** - Visual representation of stack
3. **Undo Button** - Demonstrates `pop()` operation
4. **Statistics** - Shows summary calculated from stack

**UI Features:**

```tsx
<button onClick={toggleStackView}>
  📚 Stack DSA: {transactionCount} transactions
</button>;

{
  showStackView && (
    <div>
      <button onClick={handleUndo}>↶ Undo (Pop)</button>
      <div>Total Deposits: ₹{summary.totalDeposits}</div>
      <div>Total Withdrawals: ₹{summary.totalWithdrawals}</div>
      <div>Net Change: ₹{summary.netChange}</div>
    </div>
  );
}
```

---

## 5. Why These DSA Choices?

### Binary Search Tree (BST) for Products

✅ **Efficient searching** - O(log n) vs O(n) linear search  
✅ **Sorted traversal** - Can list products alphabetically  
✅ **Range queries** - Find products in price range  
✅ **Dynamic insertion** - Add new products easily  
❌ Unbalanced trees can degrade to O(n) - could upgrade to AVL or Red-Black tree

### Stack for Transactions

✅ **Natural LIFO ordering** - Newest transactions first  
✅ **Undo functionality** - Perfect for transaction reversal  
✅ **Memory efficient** - Linked list uses minimal space  
✅ **Simple operations** - All O(1) push/pop/peek  
✅ **Real-world relevance** - Used in browsers (back button), text editors (undo)

### Alternative Considerations

**Queue (FIFO)**: Not suitable - transactions need newest-first order  
**Heap**: Overkill - don't need priority-based ordering  
**Hash Map**: Could supplement for O(1) transaction lookup by ID  
**Linked List**: Similar to Stack but less semantic meaning

---

## 6. Testing DSA Implementation

### Test BST Search

```bash
# API endpoint
GET /api/products/search?name=milk

# Response shows BST search in action
{
  "success": true,
  "product": { "name": "Milk", "price": 50 },
  "searchTime": "2ms" // O(log n) time
}
```

### Test Stack Operations

```typescript
// In browser console
const { deposit, undoLastTransaction, getTransactionSummary } = useWallet();

// Add transactions
await deposit(1000, "Test");
await withdraw(200, "Test");

// Undo (pop from stack)
const undone = undoLastTransaction();
console.log(undone); // Shows last transaction

// Get statistics
const summary = getTransactionSummary();
console.log(summary); // { totalDeposits, totalWithdrawals, netChange }
```

---

## 7. Future DSA Enhancements

### Potential Additions

1. **Queue for Medicine Reminders**

   - FIFO queue for scheduled medicine doses
   - Dequeue when medicine is taken
   - Useful for sequential task management

2. **Hash Map for User Lookup**

   - O(1) user profile retrieval
   - Better than array searching

3. **Graph for Community Events**

   - Model user connections and event relationships
   - Recommendation system using graph traversal

4. **Heap for Event Priority**

   - Priority queue for upcoming events
   - Always get next most important event in O(1)

5. **Trie for Autocomplete**
   - Prefix tree for product name suggestions
   - Fast autocomplete in grocery search

---

## 8. Learning Outcomes

### Skills Demonstrated

1. ✅ **Tree Data Structure** - BST implementation from scratch
2. ✅ **Stack Data Structure** - LIFO operations with linked nodes
3. ✅ **Algorithm Analysis** - Understanding time/space complexity
4. ✅ **Real-world Application** - Using DSA to solve actual problems
5. ✅ **Integration** - Combining DSA with Firebase and React
6. ✅ **TypeScript Generics** - Stack<T> for type safety

### Interview-Ready Concepts

This project demonstrates:

- Implementing BST insert and search
- Stack with push/pop/peek operations
- Time complexity analysis (O(1), O(log n), O(n))
- Choosing appropriate data structures for use cases
- Converting algorithms to production code
- Testing and validating DSA implementations

---

## Summary

The SeniorCare app successfully demonstrates two fundamental data structures:

1. **Binary Search Tree** - For efficient product searching (O(log n))
2. **Stack** - For transaction history with undo capability (O(1) operations)

Both implementations are:

- ✅ Working in production code (Next.js + Firebase)
- ✅ Type-safe (TypeScript with generics)
- ✅ Well-documented with complexity analysis
- ✅ Integrated with UI for visual demonstration
- ✅ Testable via API endpoints and browser tools

The DSA implementations are not just theoretical—they solve real problems in the app while teaching fundamental computer science concepts! 🎓📚
