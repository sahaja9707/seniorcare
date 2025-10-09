/**
 * Medicine Queue - Priority Queue (Min-Heap) implementation for medicine reminders
 * Sorts medicines by next reminder time (earliest first)
 */

export interface Medicine {
  id?: string;
  name: string;
  dosage: string;
  frequency: string;
  times: string[]; // Array of times in HH:MM format
  nextReminderTime?: Date;
  expiryDate?: string;
}

export interface MedicineReminder {
  nextReminderTime: Date;
  medicineName: string;
  dosage: string;
  medicineId: string;
}

/**
 * Priority Queue for Medicine Reminders
 * Uses min-heap to keep medicines sorted by next reminder time
 */
export class MedicinePriorityQueue {
  private heap: MedicineReminder[] = [];

  /**
   * Get the size of the queue
   */
  size(): number {
    return this.heap.length;
  }

  /**
   * Check if queue is empty
   */
  isEmpty(): boolean {
    return this.heap.length === 0;
  }

  /**
   * Add a medicine reminder to the priority queue
   */
  enqueue(reminder: MedicineReminder): void {
    this.heap.push(reminder);
    this.bubbleUp(this.heap.length - 1);
  }

  /**
   * Remove and return the medicine with the earliest reminder time
   */
  dequeue(): MedicineReminder | null {
    if (this.isEmpty()) return null;
    if (this.heap.length === 1) return this.heap.pop()!;

    const min = this.heap[0];
    this.heap[0] = this.heap.pop()!;
    this.bubbleDown(0);
    return min;
  }

  /**
   * Peek at the next medicine without removing it
   */
  peek(): MedicineReminder | null {
    return this.heap.length > 0 ? this.heap[0] : null;
  }

  /**
   * Get all reminders sorted by time
   */
  getAllSorted(): MedicineReminder[] {
    return [...this.heap].sort((a, b) => 
      a.nextReminderTime.getTime() - b.nextReminderTime.getTime()
    );
  }

  /**
   * Clear all reminders
   */
  clear(): void {
    this.heap = [];
  }

  private bubbleUp(index: number): void {
    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);
      if (this.heap[index].nextReminderTime >= this.heap[parentIndex].nextReminderTime) {
        break;
      }
      [this.heap[index], this.heap[parentIndex]] = [this.heap[parentIndex], this.heap[index]];
      index = parentIndex;
    }
  }

  private bubbleDown(index: number): void {
    while (true) {
      const leftChild = 2 * index + 1;
      const rightChild = 2 * index + 2;
      let smallest = index;

      if (leftChild < this.heap.length && 
          this.heap[leftChild].nextReminderTime < this.heap[smallest].nextReminderTime) {
        smallest = leftChild;
      }

      if (rightChild < this.heap.length && 
          this.heap[rightChild].nextReminderTime < this.heap[smallest].nextReminderTime) {
        smallest = rightChild;
      }

      if (smallest === index) break;

      [this.heap[index], this.heap[smallest]] = [this.heap[smallest], this.heap[index]];
      index = smallest;
    }
  }
}

/**
 * Calculate next reminder time for a medicine
 */
export function calculateNextReminderTime(timeStr: string): Date {
  const [hours, minutes] = timeStr.split(':').map(Number);
  const now = new Date();
  const nextTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes, 0);
  
  // If time has already passed today, set to next day
  if (nextTime < now) {
    nextTime.setDate(nextTime.getDate() + 1);
  }
  
  return nextTime;
}

/**
 * Load medicines into priority queue
 */
export function loadMedicinesIntoQueue(medicines: Medicine[]): MedicinePriorityQueue {
  const queue = new MedicinePriorityQueue();
  
  medicines.forEach(medicine => {
    if (medicine.times && medicine.times.length > 0) {
      medicine.times.forEach(time => {
        const nextReminderTime = calculateNextReminderTime(time);
        queue.enqueue({
          nextReminderTime,
          medicineName: medicine.name,
          dosage: medicine.dosage,
          medicineId: medicine.id || ''
        });
      });
    }
  });
  
  return queue;
}

/**
 * Check if medicine is expired
 */
export function isMedicineExpired(expiryDate: string): boolean {
  const expiry = new Date(expiryDate);
  const now = new Date();
  return expiry < now;
}

/**
 * Format reminder time for display
 */
export function formatReminderTime(date: Date): string {
  return date.toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
}
