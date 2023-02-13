import {createSlice} from '@reduxjs/toolkit';

// Files
import {login} from '../../api/auth';
import {strings} from '../../constants';
import {checkEmail, checkPassword} from '../../utils/domUtils';
import {setLoading, updatedShowModal} from '../common';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    auth: false,
    user_data: null,
    tokens: null,
  },
  reducers: {
    updatedAuthState(state, action) {
      state.auth = true;
      state.user_data = action.payload;
    },
    signOut(state) {
      state.auth = false;
      state.tokens = null;
      state.user_data = null;
    },
    setTokens(state, action) {
      state.tokens = action.payload;
    },
  },
});

export const loginManager = (apiCall: any, data: any) => {
  return async (dispatch: any) => {
    if (!data.email.trim() || !data.password.trim()) {
      return dispatch(
        updatedShowModal({
          show: true,
          message: strings.common.fill_all_fields,
          type: 'error',
        }),
      );
    }
    if (!checkEmail(data.email)) {
      return dispatch(
        updatedShowModal({
          show: true,
          message: strings.common.valid_email,
          type: 'error',
        }),
      );
    }
    if (!checkPassword(data.password)) {
      return dispatch(
        updatedShowModal({
          show: true,
          message: strings.common.valid_password,
          type: 'error',
        }),
      );
    }

    try {
      dispatch(setLoading(true));
      const res = await login(apiCall, data);
      if (res.responseCode === 200) {
        dispatch(updatedAuthState(res.data));
        dispatch(setTokens(res.data.jwtToken));
      } else {
        return dispatch(
          updatedShowModal({
            show: true,
            message: res?.failureMsg ? res.failureMsg : res.successMsg,
            type: 'error',
          }),
        );
      }
    } catch (error: any) {
      dispatch(
        updatedShowModal({
          show: true,
          message: error.message,
          type: 'error',
        }),
      );
    } finally {
      dispatch(setLoading(false));
    }
  };
};

export const {updatedAuthState, signOut, setTokens} = authSlice.actions;

export default authSlice.reducer;
