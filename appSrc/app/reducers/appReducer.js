import {
    SET_APP,
    PUSH_APP_TASK
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
        default:
            return state;
    }
}