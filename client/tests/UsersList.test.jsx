import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { useData } from '../src/hooks/useData';
import UsersList from '../src/components/usersList/UsersList';
import { getFakeProfile } from '../src/helpers/faker';

const mockUsers = [getFakeProfile(), getFakeProfile(), getFakeProfile()];

vi.mock('../src/hooks/useData', { spy: true });
useData.mockImplementation((path) => {
  return path === `profiles`
    ? { data: mockUsers, error: null, loading: false }
    : { data: [], error: null, loading: false };
});

describe('Users List', () => {
  it('renders all users', () => {
    render(<UsersList onlyFriends={false} />);
    expect(screen.queryByText(mockUsers[0].displayName)).not.toBeNull();
    expect(screen.queryByText(mockUsers[1].displayName)).not.toBeNull();
    expect(screen.queryByText(mockUsers[2].displayName)).not.toBeNull();
  });
});
