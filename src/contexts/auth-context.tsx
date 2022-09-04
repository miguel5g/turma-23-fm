import { createContext, useEffect, useState } from 'react';
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';

import { auth } from '../services/firebase';
import { User } from '../typings';

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
}

interface AuthContextProviderProps {
  children: React.ReactNode;
}

export const authContext = createContext({} as AuthContextType);

const googleProvider = new GoogleAuthProvider();

export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({ children }) => {
  const [isLoading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (state) => {
      setLoading(false);
      if (!state) setUser(null);
      else {
        setUser({
          id: state.uid,
          avatarUrl: state.photoURL,
          name: state.displayName || 'Unknown',
        });
      }
    });

    return () => unsubscribe();
  }, []);

  async function handleSignIn() {
    await signInWithPopup(auth, googleProvider)
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
    await signOut(auth)
      .then(() => setUser(null))
      .catch((error) => console.log(error));
  }

  return (
    <authContext.Provider
      value={{
        isAuthenticated: !!user,
        isLoading,
        user,
        signIn: handleSignIn,
        signOut: handleSignOut,
      }}
    >
      {children}
    </authContext.Provider>
  );
};
