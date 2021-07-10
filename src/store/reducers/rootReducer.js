import {combineReducers} from 'redux'
import authReducer from './auth'
import navReducer from "./nav";
import usersReducer from "./users";

export default combineReducers({
  nav: navReducer,
  auth: authReducer,
  users: usersReducer,
})
