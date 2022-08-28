import { child, get, push, query, ref } from 'firebase/database';

import { User } from '../contexts/auth-context';
import { database } from './firebase';

export interface Song {
  id: string;
  title: string;
  url: string;
  sender: User;
}

type CreateSongInput = Omit<Song, 'id'>;

const rootRef = ref(database);

async function getSongs(page = 1): Promise<Song[]> {
  const songsRef = child(rootRef, 'songs');
  const songsQuery = query(songsRef);

  const songs = await get(songsQuery).then((snapshot) => {
    if (snapshot.exists()) return snapshot.val() as { [key: string]: Omit<Song, 'id'> };
    return {};
  });

  return Object.entries(songs).map(([id, song]) => ({ id, ...song }));
}

async function saveSong(song: CreateSongInput): Promise<void> {
  const songsRef = child(rootRef, 'songs');

  push(songsRef, song);
}

export { getSongs, saveSong };
