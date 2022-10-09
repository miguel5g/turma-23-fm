import { equalTo, get, orderByChild, query, ref } from 'firebase/database';

import { database } from '../services/firebase';
import type { Pool, RawPool } from '../typings';
import { mapRawSongs } from './songs';

function mapRawPool(rawPool: RawPool & { id: string }): Pool {
  return {
    id: rawPool.id,
    title: rawPool.title,
    songs: Object.entries(rawPool.songs || {}).map(([songId, rawSong]) =>
      mapRawSongs(songId, rawSong)
    ),
    owner: rawPool.owner,
  };
}

async function getPool(id: string): Promise<Pool | null> {
  const poolRef = ref(database, `pools/${id}`);

  const snapshot = await get(poolRef);

  if (!snapshot.exists()) return null;

  const rawPool: RawPool = snapshot.val();

  const pool: Pool = mapRawPool({ id, ...rawPool });

  return pool;
}

async function getUserPools(userId: string): Promise<Pool[]> {
  const poolsRef = ref(database, 'pools');
  const poolsQuery = query(poolsRef, orderByChild('owner/id'), equalTo(userId));

  const snapshot = await get(poolsQuery);

  if (!snapshot.exists()) return [];

  return Object.entries(snapshot.val() as { [key: string]: RawPool }).map(([key, rawPool]) =>
    mapRawPool({ id: key, ...rawPool })
  );
}

export { getPool, getUserPools };
