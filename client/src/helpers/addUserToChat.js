import { asyncResponseFetch } from './fetch';

export const addUserToChat = async (userId, chatId) => {
  await asyncResponseFetch({
    path: `chats/${chatId}`,
    method: 'put',
    body: {
      users: JSON.stringify([userId]),
    },
  });
};
