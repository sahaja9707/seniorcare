// Stack Data Structure Implementation (LIFO - Last In First Out)
// Used for transaction history management with undo functionality

export interface StackNode<T> {
  data: T;
  next: StackNode<T> | null;
}

export class Stack<T> {
  private top: StackNode<T> | null = null;
  private size: number = 0;

  /**
   * Push element to top of stack - O(1)
   */
  push(data: T): void {
    const newNode: StackNode<T> = {
      data,
      next: this.top
    };
    this.top = newNode;
    this.size++;
  }

  /**
   * Remove and return top element - O(1)
   */
  pop(): T | null {
    if (this.isEmpty()) {
      return null;
    }
    const data = this.top!.data;
    this.top = this.top!.next;
    this.size--;
    return data;
  }

  /**
   * View top element without removing - O(1)
   */
  peek(): T | null {
    if (this.isEmpty()) {
      return null;
    }
    return this.top!.data;
  }

  /**
   * Check if stack is empty - O(1)
   */
  isEmpty(): boolean {
    return this.top === null;
  }

  /**
   * Get stack size - O(1)
   */
  getSize(): number {
    return this.size;
  }

  /**
   * Clear all elements - O(1)
   */
  clear(): void {
    this.top = null;
    this.size = 0;
  }

  /**
   * Get all elements as array (top to bottom) - O(n)
   */
  toArray(): T[] {
    const result: T[] = [];
    let current = this.top;
    
    while (current !== null) {
      result.push(current.data);
      current = current.next;
    }
    
    return result;
  }

  /**
   * Search for element in stack - O(n)
   */
  search(predicate: (item: T) => boolean): T | null {
    let current = this.top;
    
    while (current !== null) {
      if (predicate(current.data)) {
        return current.data;
      }
      current = current.next;
    }
    
    return null;
  }

  /**
   * Get elements matching condition - O(n)
   */
  filter(predicate: (item: T) => boolean): T[] {
    const result: T[] = [];
    let current = this.top;
    
    while (current !== null) {
      if (predicate(current.data)) {
        result.push(current.data);
      }
      current = current.next;
    }
    
    return result;
  }
}

// Array-based Stack implementation (alternative, simpler but uses more memory)
export class ArrayStack<T> {
  private items: T[] = [];

  push(item: T): void {
    this.items.push(item);
  }

  pop(): T | undefined {
    return this.items.pop();
  }

  peek(): T | undefined {
    return this.items[this.items.length - 1];
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }

  size(): number {
    return this.items.length;
  }

  clear(): void {
    this.items = [];
  }

  toArray(): T[] {
    return [...this.items].reverse(); // Return reversed to show latest first
  }
}
