import {createSlice} from '@reduxjs/toolkit';

const commonSlice = createSlice({
  name: 'common',
  initialState: {
    is_internet: true,
    modalData: {
      show: false,
      message: '',
      type: '',
    },
    loading: false,
  },
  reducers: {
    updateInternet(state, action) {
      state.is_internet = action.payload;
    },
    updatedShowModal(state, action) {
      state.modalData = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
  },
});

export const {updateInternet, updatedShowModal, setLoading} =
  commonSlice.actions;

export default commonSlice.reducer;
