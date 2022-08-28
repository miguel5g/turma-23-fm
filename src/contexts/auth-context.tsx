import { createContext, useEffect, useState } from 'react';
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';

import { auth } from '../services/firebase';

export interface User {
  id: string;
  name: string;
  avatarUrl: string | null;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
}

interface AuthContextProviderProps {
  children: React.ReactNode;
}

export const authContext = createContext({} as AuthContextType);

export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const provider = new GoogleAuthProvider();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (state) => {
      if (state) {
        setUser({
          id: state.uid,
          avatarUrl: state.photoURL,
          name: state.displayName || 'Unknown',
        });
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  async function handleSignIn() {
    signInWithPopup(auth, provider)
      .then(({ user }) =>
        setUser({
          id: user.uid,
          avatarUrl: user.photoURL,
          name: user.displayName || 'Unknown',
        })
      )
      .catch((error) => console.log(error));
  }

  async function handleSignOut() {
    signOut(auth)
      .then(() => setUser(null))
      .catch((error) => console.log(error));
  }

  return (
    <authContext.Provider
      value={{ isAuthenticated: !!user, user, signIn: handleSignIn, signOut: handleSignOut }}
    >
      {children}
    </authContext.Provider>
  );
};
