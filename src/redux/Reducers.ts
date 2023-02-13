import {combineReducers} from 'redux';

import AuthReducer from './auth';
import ColorReducer from './colors';
import CommonReducer from './common';

export default combineReducers({
  auth: AuthReducer,
  colors: ColorReducer,
  common: CommonReducer,
});
