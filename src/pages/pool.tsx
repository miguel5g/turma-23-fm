import { Transition } from '@headlessui/react';
import { useState } from 'react';
import { FiSend, FiX } from 'react-icons/fi';
import { useParams } from 'react-router-dom';

import { Modal } from '../components/modal';
import { AddSongForm } from '../components/add-song-form';
import { usePool } from '../hooks/use-pool';
import { Loading } from './loading';
import { SongCard } from '../components/song-card';

export const Pool: React.FC = () => {
  const [isSongModalOpen, setSongModalOpen] = useState(false);

  const { id } = useParams();

  const { isLoading, pool, songs } = usePool(id!);

  if (isLoading) {
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
        <Loading />
      </Transition>
    );
  }

  /** @todo improve pool not found feedback */
  if (!pool) return <p>Sala não encontrada</p>;

  return (
    <div className="flex justify-center min-h-screen px-6 bg-gray-50">
      <div className="flex flex-col w-full max-w-lg py-6 md:py-8">
        <header className="flex flex-col">
          <h1 className="text-4xl font-bold font-title">{pool.title}</h1>

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

        <ul className="mt-8 space-y-4">
          {/** @todo improve empty songs list feedback */}

          {songs.map((song) => (
            <li key={song.id}>
              <SongCard song={song} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
