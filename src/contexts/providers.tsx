'use client';
import theme from '@/styles/theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import type { FC, ReactNode } from 'react';
import { StoreProvider } from './storeProvider';

export const Providers: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <AppRouterCacheProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <StoreProvider>{children}</StoreProvider>
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
};
