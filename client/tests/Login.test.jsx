import { beforeEach, describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import routes from '../src/routes/routes';

beforeEach(() => {
  const router = createMemoryRouter(routes, {
    initialEntries: ['/auth/login'],
  });
  render(<RouterProvider router={router} />);
});

describe('Login', () => {
  it('renders form', () => {
    expect(screen.queryByRole('form', { name: /log in/i })).not.toBeNull();
  });

  it('displays error messages when typing incorrect values', async () => {
    const user = userEvent.setup();
    const usermailInput = screen.getByRole('textbox', { name: /username/i });
    await user.type(usermailInput, 'Username');
    const passwordInput = screen.getByLabelText(/password/i);
    await user.type(passwordInput, 'pwd');
    expect(screen.queryByText(/username\/email must/)).not.toBeNull();
    expect(screen.queryByText(/password must/)).not.toBeNull();
  });
});
