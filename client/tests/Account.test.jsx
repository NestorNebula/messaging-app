import { beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import routes from '../src/routes/routes';
import { getFakeUser, getFakeProfile } from '../src/helpers/faker';
import { useData } from '../src/hooks/useData';
import { accountAction } from '../src/helpers/actions';

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
vi.mock('../src/helpers/actions', { spy: true });
accountAction.mockImplementation(() => {
  return null;
});

const setPageToForm = async (form) => {
  const user = userEvent.setup();
  const settingsButton = screen.getByRole('button', { name: /settings/i });
  await user.click(settingsButton);
  const button = screen.getByRole('button', {
    name: form === 'informations' ? /informations/i : /profile/i,
  });
  await user.click(button);
  return user;
};

const fillUsernameForm = async (user, username, email) => {
  const usernameInput = screen.getByLabelText(/username/i);
  const emailInput = screen.getByLabelText(/email/i);
  await user.clear(usernameInput);
  await user.clear(emailInput);
  await user.type(usernameInput, username);
  await user.type(emailInput, email);
  const submitButton = screen.getByRole('button', { name: /submit/i });
  await user.click(submitButton);
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

  it('display profile again when clicking on close button', async () => {
    const user = await setPageToForm('profile');
    const closeButton = screen.getByRole('button', { name: /close/i });
    await user.click(closeButton);
    expect(screen.queryByRole('form', { name: /profile/i })).toBeNull();
  });
});

describe('Account InformationsForm', () => {
  it('renders password field only if user click on checkbox', async () => {
    const user = await setPageToForm('informations');
    expect(screen.queryByLabelText(/confirm/i)).toBeNull();
    const pwdCheckbox = screen.getByRole('checkbox', { name: /password/i });
    await user.click(pwdCheckbox);
    expect(screen.queryByLabelText(/confirm/i)).not.toBeNull();
  });

  it("doesn't submit form when data is invalid", async () => {
    const user = await setPageToForm('informations');
    await fillUsernameForm(user, 'newusername', 'mynewemail@email');
    expect(accountAction).not.toHaveBeenCalled();
  });

  it('submit form when data is valid', async () => {
    const user = await setPageToForm('informations');
    await fillUsernameForm(user, 'newusername', 'mynewemail@email.com');
    expect(accountAction).toHaveBeenCalled();
  });

  it('displays errors after submitting form', async () => {
    accountAction.mockImplementationOnce(() => {
      return {
        errors: [
          {
            msg: 'Username already taken.',
          },
        ],
      };
    });
    const user = await setPageToForm('informations');
    await fillUsernameForm(user, 'usernamealreadytaken', 'mynew@email.com');
    expect(screen.queryByText(/username already taken/i)).not.toBeNull();
  });
});
