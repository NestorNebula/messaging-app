import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { useData } from '../src/hooks/useData';
import { MemoryRouter } from 'react-router-dom';
import UsersList from '../src/components/usersList/UsersList';
import {
  getFakeChat,
  getFakeFriends,
  getFakeProfile,
  getFakeUser,
} from '../src/helpers/faker';

const mockUser = getFakeUser();
const mockUsers = [getFakeProfile(), getFakeProfile(), getFakeProfile()];
const mockFriends = getFakeFriends();
const mockChat = getFakeChat(mockFriends[0].id);

vi.mock('react', async () => {
  const actual = await vi.importActual('react');
  return {
    ...actual,
    useContext: () => {
      return { user: mockUser };
    },
  };
});
vi.mock('../src/hooks/useData', { spy: true });
useData.mockImplementation((path) => {
  return path === `profiles`
    ? { data: { profiles: mockUsers }, error: null, loading: false }
    : { data: { users: mockFriends }, error: null, loading: false };
});

describe('Users List', () => {
  it('renders all users', () => {
    render(
      <MemoryRouter>
        <UsersList onlyFriends={false} />
      </MemoryRouter>
    );
    expect(screen.queryByText(mockUsers[0].displayName)).not.toBeNull();
    expect(screen.queryByText(mockUsers[1].displayName)).not.toBeNull();
    expect(screen.queryByText(mockUsers[2].displayName)).not.toBeNull();
  });
});

describe('Users List, Only Friends', () => {
  it("renders all user's friends", () => {
    render(
      <MemoryRouter>
        <UsersList onlyFriends={true} />
      </MemoryRouter>
    );
    expect(
      screen.queryByText(mockFriends[0].profile.displayName)
    ).not.toBeNull();
    expect(
      screen.queryByText(mockFriends[1].profile.displayName)
    ).not.toBeNull();
    expect(
      screen.queryByText(mockFriends[2].profile.displayName)
    ).not.toBeNull();
  });

  it('renders only friends that are not in the chat when chat arg is provided', () => {
    render(
      <MemoryRouter>
        <UsersList onlyFriends={true} chat={mockChat} />
      </MemoryRouter>
    );
    expect(
      screen.queryByText(mockFriends[1].profile.displayName)
    ).not.toBeNull();
    expect(
      screen.queryByText(mockFriends[2].profile.displayName)
    ).not.toBeNull();
    expect(screen.queryByText(mockFriends[0].profile.displayName)).toBeNull();
  });
});
