import React, { createContext, useContext, useEffect, useState } from 'react';
import { Firestore } from "lib/firebase/Firestore";
import { onAuthStateChanged } from 'firebase/auth';

const AuthContext = createContext(null);
const firestore = new Firestore();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = firestore.Auth;
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
