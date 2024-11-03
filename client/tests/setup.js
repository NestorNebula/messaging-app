import { afterEach, beforeAll, expect, vi } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';

expect.extend(matchers);

beforeAll(async () => {
  vi.stubEnv('VITE_API_URL', 'http://localhost:4000');
  HTMLDialogElement.prototype.show = vi.fn(function () {
    this.open = true;
  });
  HTMLDialogElement.prototype.showModal = vi.fn(function () {
    this.open = true;
  });
  HTMLDialogElement.prototype.close = vi.fn(function () {
    this.open = false;
  });
});

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});
