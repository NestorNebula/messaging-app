import { redirect } from 'react-router-dom';

const authLoader = () => {
  const userId = localStorage.getItem('id');
  if (userId) return redirect('/');
  return null;
};

export { authLoader };
