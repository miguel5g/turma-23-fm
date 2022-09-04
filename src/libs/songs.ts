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
    likeCount: song.likeCount || 0,
  };
}

async function addSong(poolId: string, song: SongInput): Promise<void> {
  const songsRef = ref(database, `pools/${poolId}/songs`);

  await push(songsRef, song);
}

async function toggleSongLike(poolId: string, songId: string, userId: string): Promise<void> {
  const songRef = ref(database, `pools/${poolId}/songs/${songId}`);

  await runTransaction(songRef, (song: RawSong) => {
    if (!song) return song;

    if (song.likes && song.likes[userId]) {
      song.likeCount = (song.likeCount || 1) - 1;
      delete song.likes[userId];

      return song;
    }

    song.likeCount = (song.likeCount || 0) + 1;
    song.likes = {
      ...(song.likes || {}),
      [userId]: true,
    };

    return song;
  });
}

export { addSong, mapRawSongs, toggleSongLike };
