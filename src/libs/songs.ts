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
    likeCount: song.likes?.count || 0,
  };
}

async function addSong(poolId: string, song: SongInput): Promise<void> {
  const songsRef = ref(database, `pools/${poolId}/songs`);

  await push(songsRef, song);
}

async function toggleSongLike(poolId: string, songId: string, userId: string): Promise<void> {
  const songRef = ref(database, `pools/${poolId}/songs/${songId}/likes`);

  await runTransaction(songRef, (songLikes: RawSong['likes']) => {
    if (!songLikes) {
      return {
        count: 1,
        users: {
          [userId]: true,
        },
      };
    }

    if (songLikes.users && songLikes.users[userId]) {
      songLikes.count = (songLikes.count || 1) - 1;
      delete songLikes.users[userId];

      return songLikes;
    }

    songLikes.count = (songLikes.count || 0) + 1;
    songLikes.users = {
      ...(songLikes.users || {}),
      [userId]: true,
    };

    return songLikes;
  });
}

export { addSong, mapRawSongs, toggleSongLike };
