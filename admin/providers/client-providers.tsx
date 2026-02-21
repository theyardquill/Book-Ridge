'use client';

import React, { ReactNode, FC } from 'react';
import { ClerkProvider } from '@clerk/nextjs';
import { ThemeProvider } from '@/providers/theme-provider';
import { ToasterProvider } from '@/providers/toast-provider';
import { ModalProvider } from '@/providers/modal-provider';

interface ClientProvidersProps {
  children: ReactNode;
}


const ClientProviders: FC<ClientProvidersProps> = ({ children }) => {
  return (
    <ClerkProvider>
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
        <ToasterProvider />
        <ModalProvider>{children}</ModalProvider>
      </ThemeProvider>
    </ClerkProvider>
  );
};

export default ClientProviders;