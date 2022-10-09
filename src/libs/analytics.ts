import { logEvent } from 'firebase/analytics';

import { analytics } from '../services/firebase';

export enum EventTypes {
  COPY_POOL_CODE = 'copy_pool_code',
  CREATE_POOL = 'create_pool',
  JOIN_POOL = 'join_pool',
  LOGIN = 'login',
  LOGOUT = 'logout',
  OPEN_ON_YOUTUBE = 'open_on_youtube',
  SEND_SONG = 'send_song',
  TOGGLE_SONG_LIKE = 'toggle_song_like',
}

function handleLogEnv(event: string, details?: { [key: string]: any }) {
  logEvent(analytics, event, details);
}

function registerEvent(event: EventTypes, details?: { [key: string]: any }) {
  if (import.meta.env.DEV) return;

  if (!Object.values(EventTypes).includes(event)) throw new Error('Invalid event name');

  handleLogEnv(event, details);
}

export { registerEvent };
