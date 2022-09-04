import toast from 'react-hot-toast';
import { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { useNavigate } from 'react-router-dom';

import PodcastAudienceImage from '../assets/podcast-audience.svg';
import { useAuth } from '../hooks/use-auth';

export const Auth: React.FC = () => {
  const [isLoading, setLoading] = useState(false);
  const { isAuthenticated, signIn } = useAuth();
  const navigate = useNavigate();

  /** @todo implements redirect to by params feature */
  if (isAuthenticated) navigate('/');

  function handleSingIn() {
    setLoading(true);

    signIn()
      .then(() => navigate('/'))
      .catch(() => toast.error('Algo deu errado...'))
      .finally(() => setLoading(false));
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="flex flex-col w-full max-w-sm p-6 m-auto bg-white rounded-lg shadow-md">
        <img src={PodcastAudienceImage} alt="Pessoas ouvindo um podcast" className=" max-h-32" />

        <h1 className="mt-6 text-4xl font-bold text-center text-gray-700 font-title">
          Turma 23 FM
        </h1>

        <button
          type="button"
          className="flex-1 mt-6 button button-secondary"
          onClick={handleSingIn}
          disabled={isLoading}
        >
          <FcGoogle />

          <span className="hidden mx-2 sm:inline">Entrar com Google</span>
        </button>

        <p className="mt-6 text-xs font-light text-center text-gray-400">
          Seus dados estão seguros!
        </p>
      </div>
    </div>
  );
};
