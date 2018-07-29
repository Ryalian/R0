import { combineReducers } from 'redux';
import appReducer from './appReducer';
import stateReducer from "./stateReducer";

export default combineReducers({
    app: appReducer,
    appState: stateReducer,

});