import {combineReducers} from 'redux'
import authReducer from './auth'
import teachersReducer from "./public";

export default combineReducers({
  teachers: teachersReducer,
  auth: authReducer
})
