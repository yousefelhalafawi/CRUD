import { createSlice } from '@reduxjs/toolkit';

interface NavigationState {
  isOpen: boolean;
}

const initialState: NavigationState = {
  isOpen: true,
};

const navigationSlice = createSlice({
  name: 'navigation',
  initialState,
  reducers: {
    toggleNavigationFasle: (state) => {
      state.isOpen = false;
    },
    toggleNavigationTrue: (state) => {
        state.isOpen = true;
      },
  },
});

export const { toggleNavigationFasle, toggleNavigationTrue} = navigationSlice.actions;
export default navigationSlice.reducer;
