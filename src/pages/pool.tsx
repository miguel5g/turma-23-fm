import { useState } from 'react';
import { FiSend, FiX, FiCopy } from 'react-icons/fi';
import { useParams } from 'react-router-dom';

import HappyMusicImage from '../assets/happy-music.svg';
import { Modal } from '../components/modal';
import { AddSongForm } from '../components/add-song-form';
import { usePool } from '../hooks/use-pool';
import { Loading } from '../components/loading';
import { SongCard } from '../components/song-card';
import { PoolNotFound } from '../components/pool-not-found';
import toast from 'react-hot-toast';

export const Pool: React.FC = () => {
  const [isSongModalOpen, setSongModalOpen] = useState(false);

  const { id } = useParams();
  const { isLoading, pool, songs } = usePool(id!);

  async function handleCopyPoolId() {
    if (!id) {
      toast.error('Não consegui encontrar o id da sala');
      return;
    }

    navigator.clipboard
      .writeText(id)
      .then(() => toast.success('Copiado com sucesso'))
      .catch(() => toast.error('Algo deu errado'));
  }

  if (isLoading) return <Loading isLoading={isLoading} />;

  if (!pool) return <PoolNotFound />;

  return (
    <div className="flex justify-center min-h-screen px-6 bg-gray-50">
      <div className="flex flex-col w-full max-w-lg py-6 md:py-8">
        <header className="flex flex-col">
          <section className="flex gap-4 items-center">
            <h1 className="text-4xl font-bold font-title flex-1 truncate">{pool.title}</h1>
            <button
              type="button"
              className="button border border-dashed border-indigo-300 hover:border-indigo-400 text-sm"
              onClick={handleCopyPoolId}
            >
              <FiCopy className='text-indigo-900' />
              <span>Copiar Código</span>
            </button>
          </section>

          <button
            type="button"
            onClick={() => setSongModalOpen(true)}
            className="flex items-center justify-center gap-2 p-4 mt-4 font-light transition-colors border border-gray-400 border-dashed rounded-lg text-slate-600 hover:text-slate-900 hover:border-slate-900"
          >
            <FiSend />
            <span>Enviar Música</span>
          </button>

          <Modal
            title="Enviar nova música"
            isOpen={isSongModalOpen}
            onClose={() => setSongModalOpen(false)}
          >
            <AddSongForm poolId={id!} />
            <button
              type="button"
              className="absolute p-2 text-2xl transition-colors text-slate-600 hover:text-slate-900 top-4 right-4"
              onClick={() => setSongModalOpen(false)}
            >
              <FiX />
            </button>
          </Modal>
        </header>

        {songs.length > 0 ? (
          <ul className="mt-8 space-y-4">
            {songs.map((song) => (
              <li key={song.id}>
                <SongCard poolId={pool.id} song={song} />
              </li>
            ))}
          </ul>
        ) : (
          <div className="mt-8 flex flex-col py-8 flex-1 text-center items-center justify-center">
            <img src={HappyMusicImage} alt="Pessoa feliz ouvindo música" className="max-h-48" />
            <h2 className="text-4xl text-slate-900 font-title font-bold mt-8">
              Nenhuma sugestão por aqui
            </h2>
            <p className="font-light text-slate-600">
              Seja o primeiro a enviar uma sugestão de música
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
