import { combineReducers } from 'redux';
// import { authReducer } from './auth';
import { authStateReducer } from "redux-auth";
import entitiesReducer from './entities/reducers';
import uiReducer from './ui/reducer';

export default combineReducers({
  auth: authStateReducer,
  entities: entitiesReducer,
  ui: uiReducer
})
