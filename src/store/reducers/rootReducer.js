import {combineReducers} from 'redux'
import authReducer from './auth'
import navReducer from "./nav";
import usersReducer from "./users";
import newsReducer from "./news";

export default combineReducers({
  nav: navReducer,
  auth: authReducer,
  users: usersReducer,
  news: newsReducer
})
