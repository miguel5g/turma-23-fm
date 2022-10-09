import { Toaster } from 'react-hot-toast';
import { Analytics } from './components/analytics';

import { AuthContextProvider } from './contexts/auth-context';
import { AppRoutes } from './routes';

export const App: React.FC = () => {
  return (
    <AuthContextProvider>
      <Analytics />
      <Toaster />
      <AppRoutes />
    </AuthContextProvider>
  );
};
