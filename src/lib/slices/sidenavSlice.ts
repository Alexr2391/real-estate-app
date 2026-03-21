import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { SelectorHandler } from '../store';

type ActiveSelection = { id: string } | null;

interface SideNavState {
  activeSelection: ActiveSelection;
}

const initialState: SideNavState = {
  activeSelection: null,
};

const sideNavSlice = createSlice({
  name: 'sidenavReducer',
  initialState,
  reducers: {
    setSelection: (state, action: PayloadAction<ActiveSelection>) => {
      state.activeSelection = action.payload;
    },
  },
});

export const selectActiveSelection: SelectorHandler<ActiveSelection> = (
  state
) => state.sideNav.activeSelection;

export const { setSelection } = sideNavSlice.actions;

export default sideNavSlice.reducer;
