// src/__mocks__/mockNextAuth.tsx
import React from 'react';
import { render } from '@testing-library/react';
import { SessionProvider } from 'next-auth/react';

const mockNextAuthOptions = {
  // Mock any NextAuth options here if needed
};

export const customRender = (ui, options) => {
  const Wrapper = ({ children }) => {
    return <SessionProvider session={{ user: { name: 'Test User' } }}>{children}</SessionProvider>;
  };
  return render(ui, { wrapper: Wrapper, ...options });
};

export default mockNextAuthOptions;
