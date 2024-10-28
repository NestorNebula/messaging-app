import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Signup from '../src/components/auth/signup/Signup';

beforeEach(() => {
  render(<Signup />);
});

describe('Signup', () => {
  it('renders form', () => {
    expect(screen.queryByRole('form')).not.toBeNull();
  });

  it('display error message when typing incorrect values', async () => {
    const user = await userEvent.setup();
    const usernameInput = screen.getByRole('textbox', { name: /username/i });
    await user.type(
      usernameInput,
      'thisisaverylongpasswordthatcannotbeaccepted'
    );
    expect(screen.queryByText(/username should have/i)).not.toBeNull();
    const emailInput = screen.getByRole('textbox', { name: /email/i });
    await user.type(emailInput, 'email');
    expect(screen.queryByText(/email should/i)).not.toBeNull();
    const pwdInput = screen.getByRole('textbox', { name: /password/i });
    await user.type(pwdInput, 'pwd');
    const confirmInput = screen.getByRole('textbox', { name: /confirm/i });
    await user.type(confirmInput, 'pasword');
    expect(screen.queryAllByText(/password should have/i).length).toBe(2);
    expect(screen.queryByText(/passwords don't match/i)).not.toBeNull();
  });
});
