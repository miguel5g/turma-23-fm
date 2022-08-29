import * as Yup from 'yup';
import React, { useState } from 'react';
import { FiSend } from 'react-icons/fi';

import { useAuth } from '../hooks/use-auth';
import toast from 'react-hot-toast';
import { saveSong } from '../services/song';

const songSchema = Yup.object().shape({
  title: Yup.string().required('O título é obrigatório'),
  url: Yup.string()
    .url('Deve ser um link')
    .matches(/^https\:\/\/youtu\.be\/[\w\d\-\_]+$/, 'Deve ser um link do YouTube')
    .required('O link é obrigatório'),
});

export const SendSongForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');

  const { isAuthenticated, signIn, signOut, user } = useAuth();

  async function handleSendSong(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!isAuthenticated) return toast.error('Você precisa estar conectado!');

    try {
      const song = await songSchema.validate({
        title,
        url,
      });

      await saveSong({ ...song, sender: user! });

      toast.success('Sugestão enviada com sucesso!');

      setTitle('');
      setUrl('');
    } catch (error) {
      if (error instanceof Yup.ValidationError) toast.error(error.message);
      else toast.error('Algo deu errado...');
    }
  }

  return (
    <form className="flex flex-col mt-8" onSubmit={handleSendSong}>
      <label className="text-base font-light text-slate-700" htmlFor="song-title">
        Título da música
      </label>
      <input
        id="song-title"
        className="border border-gray-200 rounded-lg px-4 py-2.5 mt-1"
        type="text"
        name="title"
        placeholder="Of Monsters And Men - Dirty Paws (Official Lyric Video)"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />
      <label className="mt-2 text-base font-light text-slate-700" htmlFor="song-url">
        Link da música
      </label>
      <input
        id="song-url"
        className="border border-gray-200 rounded-lg px-4 py-2.5 mt-1"
        type="url"
        name="url"
        placeholder="https://youtu.be/mCHUw7ACS8o"
        value={url}
        onChange={(event) => setUrl(event.target.value)}
      />

      <div className="flex items-center justify-between mt-4">
        {user ? (
          <div className="flex gap-2">
            <img
              className="object-cover w-12 h-12 rounded-full"
              src={user.avatarUrl || 'https://dummyimage.com/48x48'}
              alt={`${user.name}`}
            />
            <div className="flex flex-col justify-center">
              <p>{user.name}</p>
              <button
                className="-mt-1 text-sm text-red-600 underline w-max"
                type="button"
                onClick={() => signOut()}
              >
                Desconectar
              </button>
            </div>
          </div>
        ) : (
          <p className="text-sm font-light text-slate-700">
            Você não está conectado.{' '}
            <button className="underline text-slate-900" type="button" onClick={() => signIn()}>
              Fazer login
            </button>
            .
          </p>
        )}

        <button className="button button-primary" type="submit" disabled={!isAuthenticated}>
          <FiSend />
          <span>Enviar</span>
        </button>
      </div>
    </form>
  );
};
