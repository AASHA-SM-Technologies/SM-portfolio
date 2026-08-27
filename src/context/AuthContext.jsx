import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
import { auth } from '../firebase/config';
import { getUserProfile, setUserAdminRole } from '../services/firestoreService';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setLoading(true);
      if (user) {
        setCurrentUser(user);
        try {
          // Fetch user profile from Firestore users/{uid}
          const profile = await getUserProfile(user.uid);
          if (profile) {
            setUserProfile(profile);
            setIsAdmin(profile.role === 'admin' && profile.active !== false);
          } else {
            // Check if user is the main developer email, grant admin setup
            setUserProfile({ uid: user.uid, email: user.email, role: 'user' });
            setIsAdmin(false);
          }
        } catch (err) {
          console.error("Error verifying admin profile:", err);
          setIsAdmin(false);
        }
      } else {
        setCurrentUser(null);
        setUserProfile(null);
        setIsAdmin(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Admin login
  const login = async (email, password) => {
    setAuthError(null);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const profile = await getUserProfile(userCredential.user.uid);
      
      if (!profile || profile.role !== 'admin' || profile.active === false) {
        // Not authorized as admin
        throw new Error('Access denied: You do not have administrator permissions for this portfolio CMS.');
      }
      
      setUserProfile(profile);
      setIsAdmin(true);
      return userCredential.user;
    } catch (err) {
      let message = err.message;
      if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
        message = 'Invalid administrator email or password.';
      } else if (err.code === 'auth/too-many-requests') {
        message = 'Too many failed login attempts. Please wait a moment and try again.';
      }
      setAuthError(message);
      throw new Error(message);
    }
  };

  // Logout
  const logout = async () => {
    setAuthError(null);
    await signOut(auth);
    setCurrentUser(null);
    setUserProfile(null);
    setIsAdmin(false);
  };

  // First-time admin account setup / link helper
  const setupAdminAccount = async (email, password) => {
    setAuthError(null);
    try {
      let user;
      try {
        const userCred = await createUserWithEmailAndPassword(auth, email, password);
        user = userCred.user;
      } catch (createErr) {
        if (createErr.code === 'auth/email-already-in-use') {
          const userCred = await signInWithEmailAndPassword(auth, email, password);
          user = userCred.user;
        } else {
          throw createErr;
        }
      }

      // Initialize admin document in Firestore users/{uid}
      await setUserAdminRole(user.uid, email);
      const updatedProfile = await getUserProfile(user.uid);
      setUserProfile(updatedProfile);
      setIsAdmin(true);
      return user;
    } catch (err) {
      setAuthError(err.message);
      throw err;
    }
  };

  const value = {
    currentUser,
    userProfile,
    isAdmin,
    loading,
    authError,
    login,
    logout,
    setupAdminAccount
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
