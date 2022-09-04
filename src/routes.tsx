import { Transition } from '@headlessui/react';
import { Route, Routes } from 'react-router-dom';

import { useAuth } from './hooks/use-auth';
import { Auth } from './pages/auth';
import { Home } from './pages/home';
import { Loading } from './pages/loading';
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
      <Transition
        show={isLoading}
        className="fixed inset-0"
        enter="transition duration-100 ease-out"
        enterFrom="transform opacity-0"
        enterTo="transform opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform opacity-100"
        leaveTo="transform opacity-0"
      >
        <Loading />
      </Transition>
    </>
  );
};
