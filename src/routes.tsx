import { Transition } from '@headlessui/react';
import { Route, Routes } from 'react-router-dom';

import { useAuth } from './hooks/use-auth';
import { Auth } from './pages/auth';
import { Home } from './pages/home';
import { Loading } from './components/loading';
import { Pool } from './pages/pool';

export const AppRoutes: React.FC = () => {
  const { isLoading } = useAuth();

  return (
    <>
      <Transition show={!isLoading}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/pools/:id" element={<Pool />} />
        </Routes>
      </Transition>
      <Loading isLoading={isLoading} />
    </>
  );
};
