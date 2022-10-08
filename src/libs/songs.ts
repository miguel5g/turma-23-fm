import { push, ref, runTransaction } from 'firebase/database';

import { database } from '../services/firebase';
import { RawSong, Song } from '../typings';

type SongInput = Omit<Song, 'id' | 'likeCount'>;

function mapRawSongs(songId: string, song: RawSong): Song {
  return {
    id: songId,
    title: song.title,
    url: song.url,
    sender: song.sender,
    likeCount: Object.keys(song.likes || {}).length,
  };
}

async function addSong(poolId: string, song: SongInput): Promise<void> {
  const songsRef = ref(database, `pools/${poolId}/songs`);

  await push(songsRef, song);
}

async function toggleSongLike(poolId: string, songId: string, userId: string): Promise<void> {
  const likeRef = ref(database, `pools/${poolId}/songs/${songId}/likes/${userId}`);

  await runTransaction(likeRef, (like?: any) => (like ? null : true));
}

export { addSong, mapRawSongs, toggleSongLike };
