import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import routes from '../src/routes/routes';
import { signUpAction } from '../src/helpers/actions';
import { asyncResponseFetch, getResponseJSON } from '../src/helpers/fetch';

beforeEach(() => {
  const router = createMemoryRouter(routes, {
    initialEntries: ['/auth/signup'],
  });
  render(<RouterProvider router={router} />);
});

vi.mock('../src/helpers/actions', { spy: true });
vi.mock('../src/helpers/fetch', { spy: true });

const typeWrongData = async (user) => {
  const usernameInput = await screen.findByRole('textbox', {
    name: /username/i,
  });
  await user.type(usernameInput, 'thisisaverylongusernamethatcannotbeaccepted');
  const emailInput = screen.getByRole('textbox', { name: /email/i });
  await user.type(emailInput, 'email');
  const pwdInput = screen.getByLabelText('password');
  await user.type(pwdInput, 'pwd');
  const confirmInput = screen.getByLabelText(/confirm/i);
  await user.type(confirmInput, 'pasword');
};

const typeCorrectData = async (user) => {
  const usernameInput = await screen.findByRole('textbox', {
    name: /username/i,
  });
  await user.type(usernameInput, 'username');
  const emailInput = screen.getByRole('textbox', { name: /email/i });
  await user.type(emailInput, 'email@email.com');
  const pwdInput = screen.getByLabelText('password');
  await user.type(pwdInput, 'password');
  const confirmInput = screen.getByLabelText(/confirm/i);
  await user.type(confirmInput, 'password');
};

describe('Signup Form', () => {
  it('renders form', async () => {
    const form = await screen.findByRole('form', { name: /sign up/i });
    expect(form).not.toBeNull();
  });

  it('displays error messages when typing incorrect values', async () => {
    const user = userEvent.setup();
    await typeWrongData(user);
    expect(screen.queryByText(/username must have/i)).not.toBeNull();
    expect(screen.queryByText(/email must have/i)).not.toBeNull();
    expect(screen.queryAllByText(/password must have/i).length).toBe(2);
    expect(screen.queryByText(/passwords don't match/i)).not.toBeNull();
  });
});

describe('Signup Action', () => {
  it("doesn't send form while data is incorrect", async () => {
    const user = userEvent.setup();
    const button = await screen.findByRole('button', { name: /sign up/i });
    await user.click(button);
    expect(signUpAction).not.toHaveBeenCalled();
    await typeWrongData(user);
    const emailInput = screen.getByRole('textbox', { name: /email/i });
    await user.type(emailInput, 'email@email.com');
    await user.click(button);
    expect(signUpAction).not.toHaveBeenCalled();
  });

  it('redirects to login after successful signup', async () => {
    asyncResponseFetch.mockImplementationOnce(() => {
      return {
        response: {
          status: 201,
        },
        error: false,
      };
    });
    const user = userEvent.setup();
    await typeCorrectData(user);
    const button = screen.getByRole('button', { name: /sign up/i });
    await user.click(button);
    expect(screen.queryByRole('form', { name: /log in/i })).not.toBeNull();
  });

  it('renders sign up with errors after unsuccessful signup', async () => {
    asyncResponseFetch.mockImplementationOnce(() => {
      return {
        response: {
          status: 400,
          errors: [
            {
              msg: 'Username already taken.',
            },
          ],
        },
        error: true,
      };
    });
    getResponseJSON.mockImplementationOnce((response) => {
      return {
        result: response,
      };
    });
    const user = userEvent.setup();
    await typeCorrectData(user);
    const button = screen.getByRole('button', { name: /sign up/i });
    await user.click(button);
    expect(screen.queryByRole('form', { name: /sign up/i })).not.toBeNull();
    expect(screen.queryByText(/username already taken/i)).not.toBeNull();
  });
});
