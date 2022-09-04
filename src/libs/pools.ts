import { get, ref } from 'firebase/database';

import { database } from '../services/firebase';
import { Pool, RawPool } from '../typings';
import { mapRawSongs } from './songs';

async function getPool(id: string): Promise<Pool | null> {
  const poolRef = ref(database, `pools/${id}`);

  const snapshot = await get(poolRef);

  if (!snapshot.exists()) return null;

  const rawPool: RawPool = snapshot.val();

  const pool: Pool = {
    id: snapshot.key!,
    title: rawPool.title,
    songs: Object.entries(rawPool.songs || {}).map(([songId, rawSong]) =>
      mapRawSongs(songId, rawSong)
    ),
    owner: rawPool.owner,
  };

  return pool;
}

export { getPool };
