import { beforeEach, describe, expect, it, vi } from 'vitest';
import { screen, render } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import routes from '../src/routes/routes';
import { getFakeUser, getFakeChats } from '../src/helpers/faker';
import { useData } from '../src/hooks/useData';

const mockUser = getFakeUser();
const mockChats = getFakeChats(mockUser.id);

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
useData.mockImplementation(() => {
  return { data: mockChats, error: null, loading: false };
});

const getRecentChat = (chats) => {
  const recent = chats.reduce(
    (value, current) =>
      (value = current.updatedAt > value.createdAt ? current : value),
    chats[0]
  );
  return recent;
};

describe('Messaging', () => {
  it('renders Messaging as App index route', () => {
    expect(screen.queryByText(/messages/i)).not.toBeNull();
  });

  it('renders all chats', () => {
    expect(screen.queryAllByRole('button', { name: /open/i }).length).toBe(
      mockChats.length
    );
  });

  it('renders chats in order', () => {
    const recent = getRecentChat(mockChats);
    expect(
      screen.queryAllByRole('button', { name: /open/i })[0].ariaLabel
    ).toMatch(recent.users[1]);
  });

  it('renders first chat messages', () => {
    const recent = getRecentChat(mockChats);
    expect(screen.queryByText(recent.messages[0])).not.toBeNull();
  });
});
