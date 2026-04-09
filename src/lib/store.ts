import { configureStore } from '@reduxjs/toolkit';
import { offersApi } from './api/offersApi';
import sideNavReducer from './slices/sidenavSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      sideNav: sideNavReducer,
      [offersApi.reducerPath]: offersApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(offersApi.middleware),
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
