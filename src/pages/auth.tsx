import toast from 'react-hot-toast';
import { useEffect, useState } from 'react';
import { FaGithub, FaGoogle, FaUserSecret } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  AuthErrorCodes,
  AuthProvider,
  GithubAuthProvider,
  GoogleAuthProvider,
} from 'firebase/auth';
import { FirebaseError } from 'firebase/app';

import PodcastAudienceImage from '../assets/podcast-audience.svg';
import { useAuth } from '../hooks/use-auth';
import { EventTypes, registerEvent } from '../libs/analytics';

export const Auth: React.FC = () => {
  const [isLoading, setLoading] = useState(false);
  const { isAuthenticated, signIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const { callbackUrl } = (location.state || {}) as { callbackUrl?: string };

  useEffect(() => {
    if (isAuthenticated) navigate('/');
  }, []);

  function handleSingIn(provider?: AuthProvider) {
    setLoading(true);

    signIn(provider)
      .then(() =>
        registerEvent(EventTypes.LOGIN, {
          from: callbackUrl,
          provider: provider?.providerId || 'anonymous',
        })
      )
      .then(() => navigate(callbackUrl || '/', { replace: !!callbackUrl }))
      .catch((error: unknown) => {
        if (!(error instanceof FirebaseError)) return toast.error('Algo deu errado...');

        let message = 'Algo deu errado...';

        if (error.code === AuthErrorCodes.NEED_CONFIRMATION)
          message = 'Seu e-mail já foi utilizado com outro provedor';

        toast.error(message);
      })
      .finally(() => setLoading(false));
  }

  return (
    <div className="flex min-h-screen bg-gray-50 px-5">
      <div className="flex flex-col w-full max-w-md m-auto">
        <img src={PodcastAudienceImage} alt="Pessoas ouvindo um podcast" className=" max-h-32" />

        <h1 className="mt-6 text-4xl font-bold text-center text-gray-700 font-title">
          Turma 23 FM
        </h1>

        <button
          type="button"
          className="flex-1 mt-6 button button-primary"
          onClick={() => handleSingIn(new GoogleAuthProvider())}
          disabled={isLoading}
        >
          <FaGoogle />
          <span>Entrar com Google</span>
        </button>
        <button
          type="button"
          className="flex-1 mt-4 button button-primary"
          onClick={() => handleSingIn(new GithubAuthProvider())}
          disabled={isLoading}
        >
          <FaGithub />
          <span>Entrar com GitHub</span>
        </button>
        <button
          type="button"
          className="flex-1 mt-4 button button-secondary"
          onClick={() => handleSingIn()}
          disabled={isLoading}
        >
          <FaUserSecret />
          <span>Entrar como Anônimo</span>
        </button>

        <p className="mt-6 text-xs font-light text-center text-gray-600">
          Seus dados estão seguros!
        </p>
      </div>
    </div>
  );
};
