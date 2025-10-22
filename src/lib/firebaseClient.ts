'use client';

import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

if (
  !process.env.NEXT_PUBLIC_FIREBASE_API_KEY ||
  !process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ||
  !process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ||
  !process.env.NEXT_PUBLIC_FIREBASE_APP_ID
) {
  console.error('Missing Firebase configuration. Required environment variables:');
  console.error('- NEXT_PUBLIC_FIREBASE_API_KEY');
  console.error('- NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN');
  console.error('- NEXT_PUBLIC_FIREBASE_PROJECT_ID');
  console.error('- NEXT_PUBLIC_FIREBASE_APP_ID');
  throw new Error('Missing Firebase configuration');
}

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

console.log('Firebase config:', {
  ...firebaseConfig,
  apiKey: firebaseConfig.apiKey ? '***' : undefined, // Hide API key in logs
});

// Initialize Firebase
// Initialize Firebase
let app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

console.log('Firebase app initialized');

export { app, auth, db };
