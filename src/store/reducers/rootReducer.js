import {combineReducers} from 'redux'
import authReducer from './auth'
import publicDataReducer from "./public";

export default combineReducers({
  publicData: publicDataReducer,
  auth: authReducer
})
