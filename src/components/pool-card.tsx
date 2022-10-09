import toast from 'react-hot-toast';
import { FiArrowRight, FiHeadphones, FiShare2 } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import type { Pool } from '../typings';

interface PoolCardProps {
  pool: Pool;
}

const PoolCard: React.FC<PoolCardProps> = ({ pool }) => {
  function handleSharePool() {
    const url = `${window.location.origin}/pools/${pool.id}`;
    
    navigator.clipboard.writeText(url).then(() => toast.success('Link copiado'));
  }

  return (
    <div className="flex flex-col p-6 bg-white border rounded-lg border-slate-300">
      <h3 className="text-2xl font-semibold truncate text-slate-700 font-title">{pool.title}</h3>
      <div className="flex items-center gap-2 font-light text text-slate-600">
        <FiHeadphones />
        <span>{pool.songs.length} músicas</span>
      </div>

      <div className="flex gap-2 mt-4">
        <button className="px-4 button button-secondary" onClick={handleSharePool}>
          <FiShare2 />
        </button>
        <Link className="flex-1 px-4 button button-primary" to={`/pools/${pool.id}`}>
          <FiArrowRight />
          <span>Acessar</span>
        </Link>
      </div>
    </div>
  );
};

export { PoolCard };
