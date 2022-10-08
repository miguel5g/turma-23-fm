import { logEvent } from 'firebase/analytics';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { analytics } from '../services/firebase';

const Analytics: React.FC = () => {
  const { pathname, search } = useLocation();

  useEffect(() => {
    if (import.meta.env.MODE !== 'production') return;

    logEvent(analytics, 'page_view', { path: pathname, search });
  }, [pathname, search]);

  return null;
};

export { Analytics };
