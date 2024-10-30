import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import routes from '../src/routes/routes';
import { logInAction } from '../src/helpers/actions';
import { asyncFetch } from '../src/helpers/fetch';

beforeEach(() => {
  const router = createMemoryRouter(routes, {
    initialEntries: ['/auth/login'],
  });
  render(<RouterProvider router={router} />);
});

vi.mock('../src/helpers/actions', { spy: true });
vi.mock('../src/helpers/fetch', { spy: true });
vi.mock('../src/helpers/loaders', async () => {
  const actual = await vi.importActual('../src/helpers/loaders');
  return {
    ...actual,
    appLoader: () => {
      return null;
    },
  };
});

const typeWrongData = async (user) => {
  const usermailInput = await screen.findByRole('textbox', {
    name: /username/i,
  });
  await user.type(usermailInput, 'Username');
  const passwordInput = screen.getByLabelText(/password/i);
  await user.type(passwordInput, 'pwd');
};

const typeCorrectData = async (user) => {
  const usermailInput = await screen.findByRole('textbox', {
    name: /username/i,
  });
  await user.type(usermailInput, 'username');
  const passwordInput = screen.getByLabelText(/password/i);
  await user.type(passwordInput, 'password');
};

describe('Login Form', () => {
  it('renders form', async () => {
    const form = await screen.findByRole('form', { name: /log in/i });
    expect(form).not.toBeNull();
  });

  it('displays error messages when typing incorrect values', async () => {
    const user = userEvent.setup();
    await typeWrongData(user);
    expect(screen.queryByText(/username\/email must/i)).not.toBeNull();
    expect(screen.queryByText(/password must/i)).not.toBeNull();
  });
});

describe('Login Action', () => {
  it("doesn't send form while data is incorrect", async () => {
    const user = userEvent.setup();
    const button = await screen.findByRole('button', { name: /log in/i });
    await user.click(button);
    await typeWrongData(user);
    await user.click(button);
    expect(logInAction).not.toHaveBeenCalled();
  });

  it('redirects to App route after successful login', async () => {
    asyncFetch.mockImplementationOnce(() => {
      return {
        result: {
          id: 1,
        },
        error: false,
      };
    });
    const user = userEvent.setup();
    await typeCorrectData(user);
    const button = screen.getByRole('button', { name: /log in/i });
    await user.click(button);
    expect(screen.queryByRole('form', { name: /log in/i })).toBeNull();
    localStorage.removeItem('id');
  });

  it('renders login with errors after unsuccessful login', async () => {
    asyncFetch.mockImplementationOnce(() => {
      return {
        result: {
          error: {
            message: 'Incorrect password.',
          },
        },
        error: true,
      };
    });
    const user = userEvent.setup();
    await typeCorrectData(user);
    const button = screen.getByRole('button', { name: /log in/i });
    await user.click(button);
    expect(screen.queryByRole('form', { name: /log in/i })).not.toBeNull();
    expect(screen.queryByText(/incorrect password/i)).not.toBeNull();
  });
});
