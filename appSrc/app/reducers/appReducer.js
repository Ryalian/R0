import {
    SET_APP,
    PUSH_APP_TASK,
    SHIFT_APP_TASK
} from '../actions/types';

const initappLCL = {
    loadedPlug: { name: null, driver: null},
    tasksList: []
}

export default function(state = initappLCL, action) {
    switch (action.type) {
        case SET_APP:
            return {
                ...state,
                loadedPlug: action.payload || null
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