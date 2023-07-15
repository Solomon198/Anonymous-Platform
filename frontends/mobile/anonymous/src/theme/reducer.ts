import {createSlice} from '@reduxjs/toolkit';
import {MODES} from './index';
const initialState = {
  mode: MODES.light,
};

const ThemeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: state => {
      if (state.mode === MODES.light) {
        state.mode = MODES.dark;
      } else {
        state.mode = MODES.light;
      }
    },
  },
});

export const {toggleTheme} = ThemeSlice.actions;
export default ThemeSlice.reducer;
