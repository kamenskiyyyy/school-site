import {combineReducers} from 'redux'
import authReducer from './auth'
import teachersReducer from "./public";
import navReducer from "./nav";

export default combineReducers({
  nav: navReducer,
  teachers: teachersReducer,
  auth: authReducer
})
