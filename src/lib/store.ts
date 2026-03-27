import { configureStore } from '@reduxjs/toolkit';
import sideNavReducer from './slices/sidenavSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      sideNav: sideNavReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
export type SelectorHandler<T> = (state: RootState) => T;
export type SelectorHandlerWithParams<T, P extends unknown[] = []> = (
  state: RootState,
  ...params: P
) => T;
