import { redirect } from 'react-router-dom';
import {
  asyncFetch,
  asyncResponseFetch,
  getResponseJSON,
  getFetchError,
} from './fetch';

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
    const hasFile = !!data.get('file');
    const fetch = await asyncResponseFetch({
      path: `chats/${data.get('chatId')}/messages`,
      method: 'post',
      body: {
        content: data.get('message'),
        hasFile,
        image: hasFile && data.get('file'),
      },
    });
    if (fetch.error) {
      return await getFetchError(
        fetch,
        "Couldn't send message. Please reload the page."
      );
    }
    const { result } = await getResponseJSON(fetch.response);
    return {
      success: true,
      message: result.message,
    };
  }
};

const accountAction = async ({ request }) => {
  const putAccount = async (path, body) => {
    const fetch = await asyncResponseFetch({
      path,
      method: 'put',
      body,
    });
    if (fetch.error) {
      if (fetch.response.status === 401) {
        return {
          error: {
            message: "Couldn't update informations. Please reload page.",
          },
        };
      } else {
        const { result } = await getResponseJSON(fetch.response);
        return result.errors
          ? { errors: result.errors }
          : { error: result.error };
      }
    }
    return redirect('/account');
  };

  const data = await request.formData();
  const intent = data.get('intent');
  if (intent === 'update-informations') {
    return await putAccount(`users/${data.get('userId')}`, {
      username: data.get('username'),
      email: data.get('email'),
      password: data.get('password') || null,
    });
  } else if (intent === 'update-profile') {
    return await putAccount(`users/${data.get('userId')}/profile`, {
      displayName: data.get('displayName'),
      avatar: data.get('avatar'),
      bio: data.get('bio'),
      link: data.get('link'),
    });
  }
};

const userProfileAction = async ({ request }) => {
  const data = await request.formData();
  const intent = data.get('intent');
  const fetch = await asyncResponseFetch({
    path: `users/${data.get('userId')}/friends`,
    method: 'put',
    body: {
      type: intent === 'add-friend' ? 'add' : 'remove',
      friendId: data.get('friendId'),
    },
  });
  if (fetch.error) {
    return await getFetchError(
      fetch,
      "Couldn't update friendship status. Please reload the page."
    );
  }
  const { result } = await getResponseJSON(fetch.response);
  return {
    success: true,
    friends: result.friends,
  };
};

export {
  signUpAction,
  logInAction,
  messagingAction,
  accountAction,
  userProfileAction,
};
