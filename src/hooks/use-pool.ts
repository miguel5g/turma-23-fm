import { onValue, ref } from 'firebase/database';
import { useEffect, useState } from 'react';

import { Pool, RawSong, Song } from '../typings';
import { getPool } from '../libs/pools';
import { database } from '../services/firebase';
import { mapRawSongs } from '../libs/songs';

interface UsePoolType {
  pool: Omit<Pool, 'songs'> | null;
  songs: Song[];
  isLoading: boolean;
}

export function usePool(id: string): UsePoolType {
  const [isLoading, setLoading] = useState(true);
  const [pool, setPool] = useState<Omit<Pool, 'songs'> | null>(null);
  const [songs, setSongs] = useState<Song[] | null>(null);

  useEffect(() => {
    getPool(id)
      .then(setPool)
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!pool) return;

    const unsubscribe = onValue(ref(database, `pools/${id}/songs`), (snapshot) => {
      if (!snapshot.exists()) setSongs([]);

      const rawSongs: { [key: string]: RawSong } = snapshot.val();
      const songs: Song[] = Object.entries(rawSongs || {}).map(([songId, rawSong]) =>
        mapRawSongs(songId, rawSong)
      );

      setSongs(songs);
    });

    return unsubscribe;
  }, [pool]);

  return {
    pool,
    isLoading,
    songs: songs || [],
  };
}
