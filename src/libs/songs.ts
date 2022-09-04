import { push, ref } from 'firebase/database';

import { database } from '../services/firebase';
import { RawSong, Song } from '../typings';

type SongInput = Omit<Song, 'id' | 'likeCount'>;

function mapRawSongs(songId: string, song: RawSong): Song {
  return {
    id: songId,
    title: song.title,
    url: song.url,
    sender: song.sender,
    likeCount: song.likeCount || 0,
  };
}

async function addSong(poolId: string, song: SongInput): Promise<void> {
  const songsRef = ref(database, `pools/${poolId}/songs`);

  await push(songsRef, song);
}

export { addSong, mapRawSongs };
