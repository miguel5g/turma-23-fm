import { push, ref } from 'firebase/database';

import { database } from '../services/firebase';
import { Song } from '../typings';

type SongInput = Omit<Song, 'id' | 'likeCount'>;

async function addSong(poolId: string, song: SongInput): Promise<void> {
  const songsRef = ref(database, `pools/${poolId}/songs`);

  await push(songsRef, song);
}

export { addSong };
