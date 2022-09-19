import { Transition } from '@headlessui/react';

import BuildingImage from '../assets/building-blocks.svg';

interface LoadingProps {
  isLoading: boolean;
}

export const Loading: React.FC<LoadingProps> = ({ isLoading }) => {
  return (
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
      <div className="flex min-h-screen p-6 items-center justify-center bg-gray-50">
        <div className="flex flex-col text-center items-center w-full">
          <img src={BuildingImage} alt="Montando a aplicação" className="max-w-sm w-full" />
          <h1 className="text-4xl text-slate-900 font-title font-bold mt-8">Carregando...</h1>
          <p className="font-light text-slate-600">Estamos preparando a aplicação para você</p>
        </div>
      </div>
    </Transition>
  );
};
