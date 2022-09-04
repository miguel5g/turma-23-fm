import { Toaster } from 'react-hot-toast';

import { AuthContextProvider } from './contexts/auth-context';
import { AppRoutes } from './routes';

export const App: React.FC = () => {
  return (
    <AuthContextProvider>
      <Toaster />
      <AppRoutes />
    </AuthContextProvider>
  );
};
