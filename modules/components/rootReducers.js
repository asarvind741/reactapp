import { combineReducers } from 'redux';

import flashMessages from './reducers/flashMessages';
import users from './reducers/userReducer';
// import auth from './reducers/auth';

export default combineReducers({
  flashMessages,
  users
  // auth
});