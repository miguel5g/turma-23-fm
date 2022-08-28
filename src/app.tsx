import { Toaster } from 'react-hot-toast';

import { AuthContextProvider } from './contexts/auth-context';
import { Home } from './pages/home';

export const App: React.FC = () => {
  return (
    <AuthContextProvider>
      <Toaster />
      <Home />
    </AuthContextProvider>
  );
};
