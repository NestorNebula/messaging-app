import { useState, useEffect } from 'react';
import { asyncResponseFetch } from '../helpers/fetch';

const useStatus = (userId) => {
  const [status, setStatus] = useState(true);

  useEffect(() => {
    asyncResponseFetch({
      path: `users/${userId}/status`,
      method: 'put',
      body: { online: status },
    });
  }, [userId, status]);

  window.addEventListener('beforeunload', () => {
    setStatus(false);
  });
};

export { useStatus };
