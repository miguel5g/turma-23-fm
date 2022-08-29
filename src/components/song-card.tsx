import { FiThumbsUp } from 'react-icons/fi';
import { Song } from '../services/song';

interface SongCardProps {
  song: Song;
}

const videoIdRegEx = /^https\:\/\/youtu\.be\/([\w\d\-\_]+)$/;

export const SongCard: React.FC<SongCardProps> = ({ song }) => {
  let videoId: string | null = null;

  if (videoIdRegEx.test(song.url)) {
    videoId = (song.url.match(videoIdRegEx) as RegExpMatchArray)[1];
    console.log(song.url, videoId)
  }

  return (
    <div className="bg-white flex flex-col p-6 rounded-lg shadow-sm">
      <h3 className="text-xl font-medium text-slate-900">{song.title}</h3>
      {videoId && (
        <iframe
          className="rounded-lg w-full h-56 mt-2"
          src={`https://www.youtube.com/embed/${videoId}`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      )}

      <div className="flex gap-2 mt-2">
        <img
          className="object-cover w-8 h-8 rounded-full my-auto"
          src={song.sender.avatarUrl || 'https://dummyimage.com/32x32'}
          alt={song.sender.name}
        />
        <p className="font-light text-slate-600 text-sm my-auto">{song.sender.name}</p>
        <a
          className="button button-secondary w-max ml-auto"
          href={song.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          Ver no YouTube
        </a>
        <button className="button button-secondary" disabled>
          <FiThumbsUp />
        </button>
      </div>
    </div>
  );
};
