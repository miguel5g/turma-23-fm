import { useEffect, useState } from 'react';

import { Pool } from '../typings';
import { getPool } from '../libs/pools';

interface UsePoolType {
  pool: Pool | null;
  isLoading: boolean;
}

export function usePool(id: string): UsePoolType {
  const [isLoading, setLoading] = useState(true);
  const [pool, setPool] = useState<Pool | null>(null);

  useEffect(() => {
    getPool(id)
      .then(setPool)
      .finally(() => setLoading(false));
  }, []);

  return {
    pool,
    isLoading,
  };
}
