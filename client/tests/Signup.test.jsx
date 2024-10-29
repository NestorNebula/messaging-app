import { beforeEach, describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import routes from '../src/routes/routes';

beforeEach(() => {
  const router = createMemoryRouter(routes, {
    initialEntries: ['/auth/signup'],
  });
  render(<RouterProvider router={router} />);
});

describe('Signup', () => {
  it('renders form', () => {
    expect(screen.queryByRole('form', { name: /sign up/i })).not.toBeNull();
  });

  it('displays error messages when typing incorrect values', async () => {
    const user = userEvent.setup();
    const usernameInput = screen.getByRole('textbox', { name: /username/i });
    await user.type(
      usernameInput,
      'thisisaverylongusernamethatcannotbeaccepted'
    );
    expect(screen.queryByText(/username must have/i)).not.toBeNull();
    const emailInput = screen.getByRole('textbox', { name: /email/i });
    await user.type(emailInput, 'email');
    expect(screen.queryByText(/email must have/i)).not.toBeNull();
    const pwdInput = screen.getByLabelText('password');
    await user.type(pwdInput, 'pwd');
    const confirmInput = screen.getByLabelText(/confirm/i);
    await user.type(confirmInput, 'pasword');
    expect(screen.queryAllByText(/password must have/i).length).toBe(2);
    expect(screen.queryByText(/passwords don't match/i)).not.toBeNull();
  });
});
