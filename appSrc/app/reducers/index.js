import { combineReducers } from 'redux';
import appReducer from './appReducer';
import LCLReducer from "./LCLReducer";
import actionReducer from "./ATFieldReducer";

export default combineReducers({
    app: appReducer,
    appLCL: LCLReducer,
    appATField: actionReducer
});