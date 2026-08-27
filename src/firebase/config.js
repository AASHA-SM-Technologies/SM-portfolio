import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics, isSupported } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyCE-Rh_hfhTrq8FIza38NeLEkKHX7_Hr5I",
  authDomain: "portfolio-64d34.firebaseapp.com",
  projectId: "portfolio-64d34",
  storageBucket: "portfolio-64d34.firebasestorage.app",
  messagingSenderId: "35446173018",
  appId: "1:35446173018:web:22a5bc225c5a6522fe5763",
  measurementId: "G-2KHVWJ5CN6"
};

// Initialize Firebase App singleton
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

// Initialize Firebase Authentication
export const auth = getAuth(app);

// Initialize Firebase Firestore Database
export const db = getFirestore(app);

// Initialize Firebase Analytics safely (only in browser environment if supported)
export let analytics = null;
if (typeof window !== 'undefined') {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  }).catch(() => {
    // Analytics fallback if blocked by browser extensions
    analytics = null;
  });
}

export default app;
