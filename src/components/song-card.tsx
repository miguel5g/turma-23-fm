import { useState } from 'react';
import { FiThumbsUp, FiYoutube as FiYouTube } from 'react-icons/fi';

import { useAuth } from '../hooks/use-auth';
import { toggleSongLike } from '../libs/songs';
import { getIdFromUrl } from '../libs/video-url';
import { Song } from '../typings';

interface SongCardProps {
  poolId: string;
  song: Song;
}

export const SongCard: React.FC<SongCardProps> = ({ poolId, song }) => {
  const [isLikeButtonDisabled, setLikeButtonDisabled] = useState(false);
  const { isAuthenticated, user } = useAuth();

  let videoId = getIdFromUrl(song.url);

  function handleToggleLike() {
    if (!user) return;

    setLikeButtonDisabled(true);

    toggleSongLike(poolId, song.id, user.id).finally(() => setLikeButtonDisabled(false));
  }

  return (
    <div className="flex flex-col p-6 bg-white rounded-lg shadow-sm">
      <h3 className="text-xl font-semibold font-title text-slate-900">{song.title}</h3>
      {videoId && (
        <iframe
          className="w-full h-56 mt-2 rounded-lg"
          src={`https://www.youtube.com/embed/${videoId}`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      )}

      <div className="flex flex-col md:flex-row gap-2 mt-2">
        <div className="flex gap-2">
          <img
            className="object-cover w-8 h-8 my-auto rounded-full"
            src={song.sender.avatarUrl || 'https://dummyimage.com/32x32'}
            alt={song.sender.name}
          />
          <p className="my-auto text-sm font-light text-slate-600">{song.sender.name}</p>
        </div>
        <div className='flex gap-2 md:ml-auto'>
          <a
            className="button button-secondary w-full md:w-max"
            href={song.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FiYouTube />
            <span>YouTube</span>
          </a>
          <button
            type="button"
            className="button button-secondary w-max"
            onClick={handleToggleLike}
            disabled={!isAuthenticated || isLikeButtonDisabled}
          >
            <FiThumbsUp />
            <span>{song.likeCount}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
