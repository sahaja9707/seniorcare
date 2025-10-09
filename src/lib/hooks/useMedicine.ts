/**
 * Custom hook for medicine management
 * Client-side operations using Priority Queue
 */
'use client';

import { useState, useEffect } from 'react';
import { auth } from '@/lib/firebaseClient';
import { 
  Medicine, 
  MedicineReminder, 
  loadMedicinesIntoQueue, 
  MedicinePriorityQueue 
} from '@/lib/dataStructures/MedicineQueue';

export function useMedicine(userId?: string) {
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [reminders, setReminders] = useState<MedicineReminder[]>([]);
  const [nextReminder, setNextReminder] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [queue, setQueue] = useState<MedicinePriorityQueue | null>(null);

  // Get current user ID from auth if not provided
  const currentUserId = userId || auth.currentUser?.uid;

  /**
   * Load medicines from API
   */
  const loadMedicines = async () => {
    if (!currentUserId) {
      setError('User not authenticated');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`/api/medicine?userId=${currentUserId}`);
      
      if (!response.ok) {
        const text = await response.text();
        throw new Error(`API error: ${response.status} - ${text}`);
      }

      const data = await response.json();

      if (data.success) {
        setMedicines(data.medicines);
        
        // Load into priority queue
        const medicineQueue = loadMedicinesIntoQueue(data.medicines);
        setQueue(medicineQueue);
        setReminders(medicineQueue.getAllSorted());
      } else {
        setError(data.error || 'Failed to load medicines');
      }
    } catch (err: any) {
      setError(err.message);
      console.error('Error loading medicines:', err);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Load next reminder
   */
  const loadNextReminder = async () => {
    if (!currentUserId) {
      setError('User not authenticated');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`/api/medicine/reminders?userId=${currentUserId}&limit=5`);
      
      if (!response.ok) {
        const text = await response.text();
        throw new Error(`API error: ${response.status} - ${text}`);
      }

      const data = await response.json();

      if (data.success) {
        setNextReminder(data.nextReminder);
      } else {
        setError(data.error || 'Failed to load reminders');
      }
    } catch (err: any) {
      setError(err.message);
      console.error('Error loading reminders:', err);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Add new medicine
   */
  const addMedicine = async (
    name: string,
    dosage: string,
    frequency: string,
    times: string[],
    expiryDate?: string
  ) => {
    if (!currentUserId) {
      setError('User not authenticated');
      return false;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await fetch('/api/medicine', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: currentUserId,
          name,
          dosage,
          frequency,
          times,
          expiryDate
        })
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(`API error: ${response.status} - ${text}`);
      }

      const data = await response.json();

      if (data.success) {
        await loadMedicines(); // Refresh list
        return true;
      } else {
        setError(data.error || 'Failed to add medicine');
        return false;
      }
    } catch (err: any) {
      setError(err.message);
      console.error('Error adding medicine:', err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Delete medicine
   */
  const deleteMedicine = async (medicineId: string) => {
    if (!currentUserId) {
      setError('User not authenticated');
      return false;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        `/api/medicine?userId=${currentUserId}&medicineId=${medicineId}`,
        { method: 'DELETE' }
      );

      if (!response.ok) {
        const text = await response.text();
        throw new Error(`API error: ${response.status} - ${text}`);
      }

      const data = await response.json();

      if (data.success) {
        await loadMedicines(); // Refresh list
        return true;
      } else {
        setError(data.error || 'Failed to delete medicine');
        return false;
      }
    } catch (err: any) {
      setError(err.message);
      console.error('Error deleting medicine:', err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Update medicine
   */
  const updateMedicine = async (
    medicineId: string,
    name: string,
    dosage: string,
    frequency: string,
    times: string[],
    expiryDate?: string
  ) => {
    if (!currentUserId) {
      setError('User not authenticated');
      return false;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await fetch('/api/medicine', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: currentUserId,
          medicineId,
          name,
          dosage,
          frequency,
          times,
          expiryDate
        })
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(`API error: ${response.status} - ${text}`);
      }

      const data = await response.json();

      if (data.success) {
        await loadMedicines(); // Refresh list
        return true;
      } else {
        setError(data.error || 'Failed to update medicine');
        return false;
      }
    } catch (err: any) {
      setError(err.message);
      console.error('Error updating medicine:', err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Load medicines on mount
  useEffect(() => {
    if (currentUserId) {
      loadMedicines();
      loadNextReminder();
    }
  }, [currentUserId]);

  return {
    medicines,
    reminders,
    nextReminder,
    loading,
    error,
    queue,
    addMedicine,
    deleteMedicine,
    updateMedicine,
    refreshMedicines: loadMedicines,
    refreshReminders: loadNextReminder,
    medicineCount: medicines.length,
    reminderCount: reminders.length
  };
}
