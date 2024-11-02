import { beforeEach, describe, expect, it, vi } from 'vitest';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import routes from '../src/routes/routes';
import {
  getFakeUser,
  getFakeChats,
  getFakeFriends,
} from '../src/helpers/faker';
import { useData } from '../src/hooks/useData';
import { sortChats } from '../src/helpers/messagingUtils';
import { messagingAction } from '../src/helpers/actions';

const mockUser = getFakeUser();
const mockChats = getFakeChats(mockUser.id);
const mockFriends = getFakeFriends();
mockChats.sort(sortChats);

beforeEach(async () => {
  const router = createMemoryRouter(routes, {
    initialEntries: ['/'],
  });
  render(<RouterProvider router={router} />);
  await screen.findByAltText(/messages/i);
});

vi.mock('../src/helpers/loaders', async () => {
  const actual = await vi.importActual('../src/helpers/loaders');
  return {
    ...actual,
    appLoader: () => {
      return { user: mockUser };
    },
  };
});
vi.mock('../src/hooks/useData', { spy: true });
useData.mockImplementation((path) => {
  return path === `users/${mockUser.id}/friends`
    ? { data: mockFriends, error: null, loading: false }
    : { data: mockChats, error: null, loading: false };
});
vi.mock('../src/helpers/actions', { spy: true });

describe('Messaging Sidebar', () => {
  it('renders Messaging as App index route', () => {
    expect(screen.queryByAltText(/messages/i)).not.toBeNull();
  });
});

describe('Messaging Sidebar', () => {
  it('renders all chats', () => {
    expect(screen.queryAllByRole('button', { name: /open chat/i }).length).toBe(
      mockChats.length
    );
  });

  it('renders chats in order', () => {
    expect(
      screen.queryAllByRole('button', { name: /open chat/i })[0].ariaLabel
    ).toMatch(mockChats[0].users[1]);
  });

  it('updates actual chat', async () => {
    const user = userEvent.setup();
    const buttons = screen.getAllByRole('button', { name: /open chat/i });
    expect(screen.queryByText(mockChats[1].messages[0].content)).toBeNull();
    await user.click(buttons[1]);
    expect(screen.queryByText(mockChats[1].messages[0].content)).not.toBeNull();
  });
});

describe('Messaging Chat', () => {
  it('renders first chat messages', () => {
    expect(screen.queryAllByRole('button', { name: /profile/ }).length).toBe(
      mockChats[0].messages.length
    );
    expect(screen.queryByText(mockChats[0].messages[0].content)).not.toBeNull();
  });
});

describe('Messaging MessageForm', () => {
  it('renders message form', () => {
    expect(screen.queryByPlaceholderText(/message/i)).not.toBeNull();
  });

  it("doesn't send message when no content is provided", async () => {
    const user = userEvent.setup();
    const button = screen.getByRole('button', { name: /send/i });
    await user.click(button);
    expect(messagingAction).not.toHaveBeenCalled();
  });

  it('displays new message after posting it', async () => {
    messagingAction.mockImplementationOnce(async ({ request }) => {
      const data = await request.formData();
      mockChats[0].messages.push({
        id: Math.random() * 10000,
        content: data.get('message'),
        file: null,
        creationDate: new Date(Date.now()),
        userId: mockUser.id,
        chatId: mockChats[0].id,
      });
      return {
        success: true,
      };
    });
    const user = userEvent.setup();
    const messageInput = screen.getByPlaceholderText(/message/i);
    await user.type(messageInput, 'This is a testing message.');
    const button = screen.getByRole('button', { name: /send/i });
    await user.click(button);
    expect(messagingAction).toHaveBeenCalled();
    expect(screen.getByText(/this is a testing message/i)).not.toBeNull();
  });

  it('displays error when failing to post', async () => {
    messagingAction.mockImplementationOnce(() => {
      return {
        success: false,
        error: {
          message: "Couldn't send message.",
        },
      };
    });
    const user = userEvent.setup();
    const messageInput = screen.getByPlaceholderText(/message/i);
    await user.type(messageInput, 'This is another testing message.');
    const button = screen.getByRole('button', { name: /send/i });
    await user.click(button);
    expect(screen.queryByText(/this is another testing message/i)).toBeNull();
    expect(screen.queryByText(/couldn't send message/i)).not.toBeNull();
  });
});

describe('Messaging UsersList', () => {
  it('displays UsersList when clicking on button to add users', async () => {
    const user = userEvent.setup();
    const displayBtn = screen.getByRole('button', { name: /add someone/i });
    await user.click(displayBtn);
    expect(screen.queryByText(/your friends/i)).not.toBeNull();
  });

  it('removes user from list after adding him to chat', async () => {
    const user = userEvent.setup();
    const displayBtn = screen.getByRole('button', { name: /add someone/i });
    await user.click(displayBtn);
    const addUsersButtons = screen.getAllByRole('button', {
      name: /add user/i,
    });
    await user.click(addUsersButtons[0]);
    expect(screen.queryByText(mockFriends[1].username)).not.toBeNull();
    expect(screen.queryByText(mockFriends[0].username)).toBeNull();
  });
});
