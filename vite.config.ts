/// <reference types="vitest" />

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    root: './src',
    globals: true,
    clearMocks: true,
    environment: 'jsdom',
    setupFiles: './setup-test.ts',
    coverage: {
      all: true,
      reporter: ['lcov'],
      include: ['src'],
    },
  },
});
