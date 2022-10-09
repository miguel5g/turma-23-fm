import toast from 'react-hot-toast';
import { useState } from 'react';
import { FiLogIn, FiPlus, FiUser } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import { push, ref } from 'firebase/database';

import { Form, FormButton, FormInput } from '../components/home-form';
import { Pool } from '../typings';
import { useAuth } from '../hooks/use-auth';
import { database } from '../services/firebase';
import { EventTypes, registerEvent } from '../libs/analytics';

type PoolInput = Omit<Pool, 'id' | 'songs'>;

export const Home: React.FC = () => {
  const [code, setCode] = useState('');
  const [title, setTitle] = useState('');

  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

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

    registerEvent(EventTypes.JOIN_POOL, { pool_id: poolId });
    navigate(`/pools/${poolId}`);
  }

  return (
    <div className="flex justify-center min-h-screen py-8 bg-gray-50 md:py-12 px-5">
      <div className="flex flex-col justify-center w-full max-w-lg">
        <h1 className="text-5xl font-bold text-slate-900 font-title">Entrar/Criar</h1>
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
