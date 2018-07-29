import {
    SET_APP,
    PUSH_APP_TASK,
    SHIFT_APP_TASK
} from '../actions/types';

const initAppState = {
    loadedApp: { name: null, driver: null},
    tasksList: []
}

export default function(state = initAppState, action) {
    switch (action.type) {
        case SET_APP:
            return {
                ...state,
                loadedApp: action.payload || null
            };
        case PUSH_APP_TASK:
            return {
                ...state,
                tasksList: [...state.tasksList, action.payload]
            };
        case SHIFT_APP_TASK:
            let newList = [...state.tasksList];
            newList.shift();
            return {
                ...state,
                tasksList: newList
            }
        default:
            return state;
    }
}