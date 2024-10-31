import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import routes from '../src/routes/routes';
import { getFakeUser, getFakeProfile } from '../src/helpers/faker';
import { useData } from '../src/hooks/useData';

const mockUser = getFakeUser();
const mockProfile = getFakeProfile(mockUser.id, mockUser.username);

beforeEach(async () => {
  const router = createMemoryRouter(routes, {
    initialEntries: ['/account'],
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
vi.mock('../src/hooks/useData', { spy: true });
useData.mockImplementation(() => {
  mockProfile.user = {
    username: mockUser.username,
  };
  return { data: mockProfile, error: null, loading: false };
});

describe('Account', () => {
  it('renders users main public infos', () => {
    expect(screen.queryByText(mockProfile.bio)).not.toBeNull();
    expect(screen.queryByText(mockProfile.displayName)).not.toBeNull();
    expect(screen.queryByText(mockProfile.link)).not.toBeNull();
    expect(screen.queryByText(`@${mockUser.username}`)).not.toBeNull();
  });

  it('renders dialog when clicking on settings button', async () => {
    const user = userEvent.setup();
    const button = screen.getByRole('button', { name: /settings/i });
    await user.click(button);
    expect(screen.queryByRole('dialog')).not.toBeNull();
  });
});
