import { createContext, useEffect, useState } from 'react';
import {
  AuthProvider,
  onAuthStateChanged,
  signInAnonymously,
  signInWithPopup,
  signOut,
  User as AuthUser,
} from 'firebase/auth';

import { auth } from '../services/firebase';
import { User } from '../typings';

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
  signIn: (provider?: AuthProvider) => Promise<void>;
  signOut: () => Promise<void>;
}

interface AuthContextProviderProps {
  children: React.ReactNode;
}

export const authContext = createContext({} as AuthContextType);

export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({ children }) => {
  const [isLoading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (state) => {
      setLoading(false);

      if (!state) setUser(null);
      else successfullyAuth(state);
    });

    return () => unsubscribe();
  }, []);

  function successfullyAuth(user: AuthUser) {
    setUser({
      id: user.uid,
      avatarUrl: user.photoURL,
      name: user.displayName || 'Anônimo',
    });
  }

  async function handleSignIn(provider?: AuthProvider) {
    if (!provider) {
      await signInAnonymously(auth).then(({ user }) => successfullyAuth(user));
      return;
    }

    await signInWithPopup(auth, provider).then(({ user }) => successfullyAuth(user));
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
