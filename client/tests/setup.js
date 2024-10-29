import { afterEach, beforeAll, expect, vi } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';

expect.extend(matchers);

beforeAll(async () => {
  vi.stubEnv('VITE_API_URL', 'http://localhost:4000');
});

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});
