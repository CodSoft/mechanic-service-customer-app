import {createSlice} from '@reduxjs/toolkit';

// Files
import {colors} from '../../theme';

const colorSlice = createSlice({
  name: 'colors',
  initialState: {
    mode: 'light',
    theme: colors.light_theme,
  },
  reducers: {
    updatedTheme(state) {
      if (state.mode === 'light') {
        state.mode = 'dark';
        state.theme = colors.dark_theme;
      } else {
        state.mode = 'light';
        state.theme = colors.light_theme;
      }
    },
  },
});

export const {updatedTheme} = colorSlice.actions;

export default colorSlice.reducer;
