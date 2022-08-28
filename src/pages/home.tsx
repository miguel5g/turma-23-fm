import { useEffect, useState } from 'react';

import { Header } from '../components/header';
import { getSongs, Song } from '../services/song';

export const Home: React.FC = () => {
  const [songs, setSongs] = useState<Song[]>([]);

  useEffect(() => {
    getSongs().then((data) => setSongs(data as any));
  }, []);

  return (
    <div className="flex min-h-screen px-4 py-16">
      <div className="flex flex-col max-w-xl mx-auto">
        <Header />

        <main>
          <ul>
            {songs.map((song) => (
              <li key={song.id}>
                <div>
                  <h3>{song.title}</h3>
                  <a href={song.url} target="_blank" rel="noopener noreferrer">
                    Ver no YouTube
                  </a>
                  <div className="flex items-center gap-2">
                    <img
                      className="object-cover w-8 h-8 rounded-full"
                      src={song.sender.avatarUrl || 'https://dummyimage.com/32x32'}
                      alt={song.sender.name}
                    />
                    <p>{song.sender.name}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </main>
      </div>
    </div>
  );
};
