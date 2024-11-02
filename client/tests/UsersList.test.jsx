import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { useData } from '../src/hooks/useData';
import { MemoryRouter } from 'react-router-dom';
import UsersList from '../src/components/usersList/UsersList';
import { getFakeProfile, getFakeUser } from '../src/helpers/faker';

const mockUser = getFakeUser();
const mockUsers = [getFakeProfile(), getFakeProfile(), getFakeProfile()];

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
    ? { data: mockUsers, error: null, loading: false }
    : { data: [], error: null, loading: false };
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
