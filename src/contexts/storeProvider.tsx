'use client';
import { makeStore } from '@/lib/store';
import { setupListeners } from '@reduxjs/toolkit/query';
import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';
import { Provider } from 'react-redux';

interface Props {
  readonly children: ReactNode;
}

export const StoreProvider = ({ children }: Props) => {
  const [store] = useState(makeStore());

  useEffect(() => {
    const unsubscribe = setupListeners(store.dispatch);
    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Provider store={store}>{children}</Provider>;
};
