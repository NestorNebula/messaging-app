import { beforeEach, describe, expect, it, vi } from 'vitest';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import routes from '../src/routes/routes';
import { getFakeUser, getFakeChats } from '../src/helpers/faker';
import { useData } from '../src/hooks/useData';
import { sortChats } from '../src/helpers/messagingUtils';

const mockUser = getFakeUser();
const mockChats = getFakeChats(mockUser.id);
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
useData.mockImplementation(() => {
  return { data: mockChats, error: null, loading: false };
});

describe('Messaging Sidebar', () => {
  it('renders Messaging as App index route', () => {
    expect(screen.queryByAltText(/messages/i)).not.toBeNull();
  });
});

describe('Messaging Sidebar', () => {
  it('renders all chats', () => {
    expect(screen.queryAllByRole('button', { name: /open/i }).length).toBe(
      mockChats.length
    );
  });

  it('renders chats in order', () => {
    expect(
      screen.queryAllByRole('button', { name: /open/i })[0].ariaLabel
    ).toMatch(mockChats[0].users[1]);
  });

  it('updates actual chat', async () => {
    const user = userEvent.setup();
    const buttons = screen.getAllByRole('button', { name: /open/i });
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
