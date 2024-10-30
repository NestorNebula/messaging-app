import { beforeEach, describe, expect, it, vi } from 'vitest';
import { screen, render } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import routes from '../src/routes/routes';
import { getFakeUser } from '../src/helpers/faker';

beforeEach(async () => {
  const router = createMemoryRouter(routes, {
    initialEntries: ['/'],
  });
  render(<RouterProvider router={router} />);
  await screen.findByAltText(/messages/i);
});

vi.mock('../src/helpers/loaders', async () => {
  const actual = await vi.importActual('../src/helpers/loaders');
  return {
    ...actual,
    appLoader: () => {
      return { user: getFakeUser() };
    },
  };
});

describe('Messaging', () => {
  it('renders Messaging as App index route', () => {
    expect(screen.queryByText(/messages/i)).not.toBeNull();
  });
});
