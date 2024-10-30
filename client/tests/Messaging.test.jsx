import { beforeEach, describe, expect, it } from 'vitest';
import { screen, render } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import routes from '../src/routes/routes';

beforeEach(async () => {
  const router = createMemoryRouter(routes, {
    initialEntries: ['/'],
  });
  render(<RouterProvider router={router} />);
  await screen.findByAltText(/messages/i);
});

describe('Messaging', () => {
  it('renders Messaging as App index route', () => {
    expect(screen.queryByText(/messages/i)).not.toBeNull();
  });
});
