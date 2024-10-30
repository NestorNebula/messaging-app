import { redirect } from 'react-router-dom';
import { asyncFetch, asyncResponseFetch, getResponseJSON } from './fetch';

const appLoader = async () => {
  const userId = localStorage.getItem('id');
  if (!userId) return redirect('/auth/login');
  let user = null;
  let count = 0;
  while (count < 2) {
    const fetch = await asyncResponseFetch({
      path: `users/${userId}`,
      method: 'get',
    });
    if (fetch.error) {
      const refreshFetch = await asyncFetch({
        path: 'auth/refresh',
        method: 'get',
      });
      if (refreshFetch.error) {
        localStorage.removeItem('id');
        return redirect('/auth/login');
      }
      localStorage.setItem('id', refreshFetch.result.id);
    } else {
      const { result } = await getResponseJSON(fetch.response);
      user = result.user;
    }
    if (user) break;
    count++;
  }
  if (!user) return redirect('/auth/login');
  return { user };
};

const authLoader = () => {
  const userId = localStorage.getItem('id');
  if (userId) return redirect('/');
  return null;
};

export { appLoader, authLoader };
