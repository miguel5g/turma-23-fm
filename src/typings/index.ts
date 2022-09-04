export interface User {
  id: string;
  name: string;
  avatarUrl: string | null;
}

interface RawSongLikes {
  [key: string]: boolean;
}

export interface RawSong {
  title: string;
  url: string;
  likes?: RawSongLikes;
  sender: User;
}

interface RawSongs {
  [key: string]: RawSong;
}

export interface Song {
  id: string;
  title: string;
  url: string;
  likeCount: number;
  // isLiked: boolean;
  sender: User;
}

export interface RawPool {
  title: string;
  owner: User;
  songs?: RawSongs;
}

export interface Pool {
  id: string;
  title: string;
  owner: User;
  songs: Song[];
}
