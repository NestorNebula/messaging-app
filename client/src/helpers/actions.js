import { redirect } from 'react-router-dom';
import { asyncFetch, asyncResponseFetch, getResponseJSON } from './fetch';

const signUpAction = async ({ request }) => {
  const data = await request.formData();
  const fetch = await asyncResponseFetch({
    path: 'auth/signup',
    method: 'post',
    body: {
      username: data.get('username'),
      email: data.get('email'),
      password: data.get('password'),
    },
  });
  if (fetch.error) {
    const { result } = await getResponseJSON(fetch.response);
    return result.errors ? { errors: result.errors } : { error: result.error };
  }
  return redirect('/auth/login');
};

const logInAction = async ({ request }) => {
  const data = await request.formData();
  const fetch = await asyncFetch({
    path: 'auth/login',
    method: 'post',
    body: {
      username: data.get('username'),
      password: data.get('password'),
    },
  });
  if (fetch.error) {
    return { error: fetch.result.error };
  }
  localStorage.setItem('id', fetch.result.id);
  return redirect('/');
};

const messagingAction = async ({ request }) => {
  const data = await request.formData();
  const intent = data.get('intent');
  if (intent === 'send') {
    // TODO
  }
};

export { signUpAction, logInAction, messagingAction };
