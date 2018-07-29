import { combineReducers } from 'redux';
import appReducer from './appReducer';
import stateReducer from "./stateReducer";
import actionReducer from "./actionReducer";

export default combineReducers({
    app: appReducer,
    appState: stateReducer,
    appAction: actionReducer
});