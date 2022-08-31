import { useEffect, useState } from 'react';

import { Header } from '../components/header';
import { SongCard } from '../components/song-card';
import { useAuth } from '../hooks/use-auth';
import { getSongs, Song } from '../services/song';

export const Home: React.FC = () => {
  const [songs, setSongs] = useState<Song[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    getSongs(user?.id).then((data) => setSongs(data as any));
  }, []);

  return (
    <div className="flex min-h-screen px-4 py-16 bg-gray-50">
      <div className="flex flex-col max-w-xl mx-auto">
        <Header />

        <main className="flex flex-col mt-8">
          <ul className="space-y-4">
            {songs.map((song) => (
              <li key={song.id}>
                <SongCard song={song} />
              </li>
            ))}
          </ul>
        </main>
      </div>
    </div>
  );
};
