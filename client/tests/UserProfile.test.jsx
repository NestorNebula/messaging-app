import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import routes from '../src/routes/routes';
import { getFakeProfile, getFakeUser } from '../src/helpers/faker';
import { userProfileAction } from '../src/helpers/actions';

const mockUser = getFakeUser();
const mockUserProfile = getFakeProfile(
  undefined,
  undefined,
  true,
  true,
  mockUser.id,
  true
);

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
      return {
        data: { profile: mockUserProfile },
        error: null,
        loading: false,
      };
    },
  };
});
vi.mock('../src/helpers/actions', async () => {
  const actual = await vi.importActual('../src/helpers/actions');
  return {
    ...actual,
    userProfileAction: vi.fn(async ({ request }) => {
      const data = await request.formData();
      if (data.get('intent') === 'remove-friend') {
        console.log(mockUserProfile.user.followers, mockUser);
        mockUserProfile.user.followers = mockUserProfile.user.followers.filter(
          (follower) => follower.id !== mockUser.id
        );
      }
      return {
        success: true,
        friends: mockUserProfile.user.friends,
      };
    }),
  };
});

describe('UserProfile', () => {
  it('renders profile of corresponding user', () => {
    expect(screen.getByText(mockUserProfile.displayName)).not.toBeNull();
    expect(screen.queryByText(mockUserProfile.user.username)).not.toBeNull();
    expect(screen.queryByText(mockUserProfile.bio)).not.toBeNull();
  });

  it('displays remove button when user in friends', () => {
    expect(screen.queryByRole('button', { name: /remove/i })).not.toBeNull();
  });

  it('displays add button after removing friend', async () => {
    const user = userEvent.setup();
    const button = screen.getByRole('button', { name: /remove/i });
    await user.click(button);
    expect(screen.queryByRole('button', { name: /remove/i })).toBeNull();
    expect(screen.queryByRole('button', { name: /add/i })).not.toBeNull();
  });

  it('calls userProfile action for creating chat with user', async () => {
    const user = userEvent.setup();
    const button = screen.getByRole('button', { name: /message/i });
    await user.click(button);
    expect(userProfileAction).toHaveBeenCalled();
  });
});
