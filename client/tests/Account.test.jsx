import { beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import routes from '../src/routes/routes';
import { getFakeUser, getFakeProfile } from '../src/helpers/faker';
import { useData } from '../src/hooks/useData';

const mockUser = getFakeUser();
const mockProfile = getFakeProfile(mockUser.id, mockUser.username);

beforeAll(() => {
  HTMLDialogElement.prototype.show = vi.fn(function () {
    this.open = true;
  });
  HTMLDialogElement.prototype.showModal = vi.fn(function () {
    this.open = true;
  });
  HTMLDialogElement.prototype.close = vi.fn(function () {
    this.open = false;
  });
});

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

const setPageToForm = async (form) => {
  const user = userEvent.setup();
  const settingsButton = screen.getByRole('button', { name: /settings/i });
  await user.click(settingsButton);
  const button = screen.getByRole('button', {
    name: form === 'informations' ? /informations/i : /profile/i,
  });
  await user.click(button);
};

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

  it('displays private informations form when clicking on first dialog button', async () => {
    await setPageToForm('informations');
    expect(
      screen.queryByRole('form', { name: /informations/i })
    ).not.toBeNull();
  });

  it('displays profile form when clicking on second dialog button', async () => {
    await setPageToForm('profile');
    expect(screen.queryByRole('form', { name: /profile/i })).not.toBeNull();
  });
});
