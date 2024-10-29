import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import routes from '../src/routes/routes';
import { signUpAction } from '../src/helpers/actions';

beforeEach(() => {
  const router = createMemoryRouter(routes, {
    initialEntries: ['/auth/signup'],
  });
  render(<RouterProvider router={router} />);
});

vi.mock('../src/helpers/actions', async () => {
  const actual = await vi.importActual('../src/helpers/actions');
  return {
    ...actual,
    signUpAction: vi.fn(() => {}),
  };
});

const typeWrongData = async (user) => {
  const usernameInput = screen.getByRole('textbox', { name: /username/i });
  await user.type(usernameInput, 'thisisaverylongusernamethatcannotbeaccepted');
  const emailInput = screen.getByRole('textbox', { name: /email/i });
  await user.type(emailInput, 'email');
  const pwdInput = screen.getByLabelText('password');
  await user.type(pwdInput, 'pwd');
  const confirmInput = screen.getByLabelText(/confirm/i);
  await user.type(confirmInput, 'pasword');
};

describe('Signup', () => {
  it('renders form', () => {
    expect(screen.queryByRole('form', { name: /sign up/i })).not.toBeNull();
  });

  it('displays error messages when typing incorrect values', async () => {
    const user = userEvent.setup();
    await typeWrongData(user);
    expect(screen.queryByText(/username must have/i)).not.toBeNull();
    expect(screen.queryByText(/email must have/i)).not.toBeNull();
    expect(screen.queryAllByText(/password must have/i).length).toBe(2);
    expect(screen.queryByText(/passwords don't match/i)).not.toBeNull();
  });

  it("doesn't send form while data is incorrect", async () => {
    const user = userEvent.setup();
    const button = screen.getByRole('button', { name: /sign up/i });
    await user.click(button);
    expect(signUpAction).not.toHaveBeenCalled();
    await typeWrongData(user);
    await user.click(button);
    expect(signUpAction).not.toHaveBeenCalled();
  });
});
