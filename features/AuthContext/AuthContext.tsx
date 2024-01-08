import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { Firestore } from "lib/firebase/Firestore";
import { onAuthStateChanged, User } from 'firebase/auth';

export type AuthContextType = {
  currentUser: User | null;
  loading: boolean;
}

type AuthProviderProps = {
  children: ReactNode;
};

const AuthContext = createContext<AuthContextType | null>(null);
const firestore = new Firestore();

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

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
