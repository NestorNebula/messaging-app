import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import routes from '../src/routes/routes';
import { getFakeProfile, getFakeUser } from '../src/helpers/faker';

const mockUser = getFakeUser();
const mockUserProfile = getFakeProfile();

beforeEach(async () => {
  const router = createMemoryRouter(routes, {
    initialEntries: [`/profile/${mockUserProfile.userId}`],
  });
  render(<RouterProvider router={router} />);
  await screen.findByText(/@/i);
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
vi.mock('../src/hooks/useData', () => {
  return {
    useData: () => {
      return { data: mockUserProfile, error: null, loading: false };
    },
  };
});

describe('UserProfile', () => {
  it('renders profile of corresponding user', () => {
    expect(screen.getByText(mockUserProfile.displayName)).not.toBeNull();
    expect(screen.queryByText(mockUserProfile.user.username)).not.toBeNull();
    expect(screen.queryByText(mockUserProfile.bio)).not.toBeNull();
  });
});
