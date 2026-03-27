'use client';
import { makeStore } from '@/lib/store';
import type { ReactNode } from 'react';
import { useState } from 'react';
import { Provider } from 'react-redux';

interface Props {
  readonly children: ReactNode;
}

export const StoreProvider = ({ children }: Props) => {
  const [store] = useState(makeStore());

  return <Provider store={store}>{children}</Provider>;
};
