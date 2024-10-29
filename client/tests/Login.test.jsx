import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import routes from '../src/routes/routes';
import { logInAction } from '../src/helpers/actions';

beforeEach(() => {
  const router = createMemoryRouter(routes, {
    initialEntries: ['/auth/login'],
  });
  render(<RouterProvider router={router} />);
});

vi.mock('../src/helpers/actions', { spy: true });

const typeWrongData = async (user) => {
  const usermailInput = screen.getByRole('textbox', { name: /username/i });
  await user.type(usermailInput, 'Username');
  const passwordInput = screen.getByLabelText(/password/i);
  await user.type(passwordInput, 'pwd');
};

describe('Login Form', () => {
  it('renders form', () => {
    expect(screen.queryByRole('form', { name: /log in/i })).not.toBeNull();
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
    const button = screen.getByRole('button', { name: /log in/i });
    await user.click(button);
    await typeWrongData(user);
    await user.click(button);
    expect(logInAction).not.toHaveBeenCalled();
  });
});
