import { redirect } from 'react-router-dom';
import { asyncFetch } from './fetch';

const signUpAction = async ({ request }) => {
  const data = await request.formData();
  const fetch = await asyncFetch({
    path: 'auth/signup',
    method: 'post',
    body: {
      username: data.get('username'),
      email: data.get('email'),
      password: data.get('password'),
    },
  });
  if (fetch.error) {
    return fetch.result.errors
      ? { errors: fetch.result.errors }
      : { error: fetch.result.error };
  }
  return redirect('/auth/login');
};

export { signUpAction };