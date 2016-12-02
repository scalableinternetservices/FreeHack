import { combineReducers } from 'redux';
import { tweetsReducer } from './tweets';
import { usersReducer } from './users';

export default combineReducers({
  tweets: tweetsReducer,
  users: usersReducer
});
