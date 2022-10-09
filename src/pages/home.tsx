import toast from 'react-hot-toast';
import { useEffect, useState } from 'react';
import { FiLogIn, FiPlus, FiUser } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import { push, ref } from 'firebase/database';

import AccessAccountImage from '../assets/access-account.svg';
import HappyMusicImage from '../assets/happy-music.svg';
import { Form, FormButton, FormInput } from '../components/home-form';
import { Pool } from '../typings';
import { useAuth } from '../hooks/use-auth';
import { database } from '../services/firebase';
import { EventTypes, registerEvent } from '../libs/analytics';
import { getUserPools } from '../libs/pools';
import { PoolCard } from '../components/pool-card';

type PoolInput = Omit<Pool, 'id' | 'songs'>;

export const Home: React.FC = () => {
  const [code, setCode] = useState('');
  const [title, setTitle] = useState('');
  const [userPools, setUserPools] = useState<Pool[] | null>(null);

  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) getUserPools(user.id).then(setUserPools);
  }, [user]);

  function handleJoinPool() {
    /** @todo improve validation with RegEx */
    if (code.length !== 20) {
      toast.error('Código da sala inválido');
      return;
    }

    registerEvent(EventTypes.JOIN_POOL, { pool_id: code });
    navigate(`/pools/${code}`);
  }

  function handleCreatePool() {
    if (!isAuthenticated) {
      toast.error('Acesse sua conta para poder criar');
      return;
    }

    if (title.length < 4 || title.length > 32) {
      toast.error('O título deve ter de 4 a 32 caracteres');
      return;
    }

    const newPool: PoolInput = {
      title,
      owner: user!,
    };

    const poolsRef = ref(database, 'pools');

    const poolId = push(poolsRef, newPool).key;

    registerEvent(EventTypes.CREATE_POOL, { pool_id: poolId });
    navigate(`/pools/${poolId}`);
  }

  return (
    <div className="relative flex flex-col-reverse items-center justify-center min-h-screen gap-12 px-5 py-12 bg-gray-50 md:py-16 lg:flex-row lg:items-start">
      <div className="w-full max-w-lg">
        <h2 className="text-5xl font-bold text-slate-900 font-title">Suas salas</h2>
        {userPools && userPools.length > 0 && (
          <ul className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-2">
            {(userPools || []).map((pool) => (
              <li key={pool.id}>
                <PoolCard pool={pool} />
              </li>
            ))}
          </ul>
        )}

        {userPools && userPools.length === 0 && (
          <div className="flex flex-col items-center justify-center flex-1 py-8 mt-8 text-center">
            <img src={HappyMusicImage} alt="Pessoa feliz ouvindo música" className="max-h-48" />
            <h2 className="mt-8 text-4xl font-bold text-slate-900 font-title">
              Você ainda não criou nenhum sala
            </h2>
            <p className="font-light text-slate-600">Crie uma sala e ela vai aparecer aqui</p>
          </div>
        )}

        {!userPools && (
          <div className="flex flex-col items-center justify-center flex-1 py-8 mt-8 text-center">
            <img src={AccessAccountImage} alt="Tela de autenticação" className="max-h-48" />
            <h2 className="mt-8 text-4xl font-bold text-slate-900 font-title">
              Acesse sua conta para ver suas salas
            </h2>
            <p className="font-light text-slate-600">
              Após acessar sua conta você verá todas as suas salas criadas aqui
            </p>
          </div>
        )}
      </div>

      <div className="flex flex-col w-full max-w-lg lg:top-16 lg:sticky">
        <h2 className="text-5xl font-bold text-slate-900 font-title">Entrar/Criar</h2>
        <p className="font-light text-slate-600">
          Escolha músicas de forma democrática, deixe o público votar
        </p>

        <Form onSubmit={handleJoinPool} title="Entrar com código" className="mt-8">
          <FormInput id="pool-code" label="Código" onChange={setCode} value={code} />
          <FormButton>
            <FiLogIn />
            <span>Entrar</span>
          </FormButton>
        </Form>

        <div className="flex items-center mt-8 mb-5">
          <span className="flex-1 h-px bg-gray-200" />
          <span className="mx-4 font-title text-slate-500">OU</span>
          <span className="flex-1 h-px bg-gray-200" />
        </div>

        <Form onSubmit={handleCreatePool} title="Criar nova sala">
          <FormInput id="pool-title" label="Título" onChange={setTitle} value={title} />
          {isAuthenticated ? (
            <FormButton>
              <FiPlus />
              <span>Criar</span>
            </FormButton>
          ) : (
            <Link to="/auth" className="mt-2 button button-secondary">
              <FiUser />
              <span>Acessar Conta</span>
            </Link>
          )}
        </Form>
      </div>
    </div>
  );
};
