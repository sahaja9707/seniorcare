'use client';

import { useState, useEffect } from 'react';
import { collection, query, orderBy, getDocs, addDoc, Timestamp } from 'firebase/firestore';
import { db } from '../firebaseClient';

export interface Event {
  id: string;
  name: string;
  date: string;
  time: string;
  description?: string;
}

export function useEvents() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      if (!db) {
        throw new Error('Firebase database is not initialized');
      }

      const eventsRef = collection(db, 'events');
      const q = query(eventsRef, orderBy('date', 'asc'));
      const querySnapshot = await getDocs(q);
      
      const eventsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        // Convert Firestore Timestamp to string if needed
        date: doc.data().date instanceof Timestamp 
          ? doc.data().date.toDate().toLocaleDateString()
          : doc.data().date,
      })) as Event[];

      setEvents(eventsData);
      setError(null);
    } catch (err) {
      console.error('Error fetching events:', err);
      setError('Failed to load events');
    } finally {
      setLoading(false);
    }
  };

  const addEvent = async (eventData: Omit<Event, 'id'>) => {
    try {
      if (!db) {
        throw new Error('Firebase database is not initialized');
      }

      const eventsRef = collection(db, 'events');
      await addDoc(eventsRef, {
        ...eventData,
        createdAt: Timestamp.now(),
      });
      await fetchEvents(); // Refresh the events list
      return true;
    } catch (err) {
      console.error('Error adding event:', err);
      setError('Failed to add event');
      return false;
    }
  };

  return {
    events,
    loading,
    error,
    addEvent,
    refreshEvents: fetchEvents,
  };
}