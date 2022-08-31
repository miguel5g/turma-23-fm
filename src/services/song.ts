import { child, get, push, query, ref, remove } from 'firebase/database';

import { User } from '../contexts/auth-context';
import { database } from './firebase';

interface SongLikes {
  [key: string]: string;
}

interface BaseSong {
  title: string;
  url: string;
  sender: User;
}

interface RawSong extends BaseSong {
  likes?: SongLikes;
}

interface RawSongs {
  [key: string]: RawSong;
}

export interface Song extends BaseSong {
  id: string;
  likeCount: number;
  likeId?: string /** @todo replace by liked boolean */;
}

type CreateSongInput = Omit<Song, 'id'>;

const rootRef = ref(database);

function mapRawSongToSong(id: string, song: RawSong, userId?: string): Song {
  const userLike = userId && Object.entries(song.likes || {}).find(([, value]) => value === userId);

  const mappedSong: Song = {
    id,
    ...song,
    likeCount: Object.keys(song.likes || {}).length,
    likeId: userLike && userLike[0],
  };

  delete song.likes;

  return mappedSong;
}

async function getSongs(userId?: string, page = 1): Promise<Song[]> {
  const songsRef = child(rootRef, 'songs');
  const songsQuery = query(songsRef);

  const songs = await get(songsQuery).then((snapshot) => {
    if (snapshot.exists()) return snapshot.val() as RawSongs;
    return {};
  });

  return Object.entries(songs).map(([key, value]) => mapRawSongToSong(key, value, userId));
}

async function saveSong(song: CreateSongInput): Promise<void> {
  const songsRef = child(rootRef, 'songs');

  push(songsRef, song);
}

async function toggleFavoriteSong(songId: string, userId?: string, likeId?: string) {
  const isAddingLike = !likeId;
  const songLikesRef = child(rootRef, `songs/${songId}/likes`);

  if (isAddingLike) {
    if (!userId) throw new Error('User id must be defined when creating like');

    await push(songLikesRef, userId);

    return;
  }

  await remove(child(songLikesRef, likeId));
}

export { getSongs, saveSong, toggleFavoriteSong };
