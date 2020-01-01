import { combineReducers } from "redux";
import authReducer from "./Auth/auth.reducer";
import  profileReducer from './Data/data.reducer'


export default combineReducers({  authReducer,  profileReducer });