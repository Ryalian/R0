import {
    SET_APP,
    SET_APP_DATA,
    UPDATE_APP_DATA,
    UPDATE_APP_STATE,
    UPDATE_APP_ACTION,

    PUSH_APP_TASK,
    SHIFT_APP_TASK,
    CLEAR_APP_TASK,
    SET_AT_FIELD
} from './types';


// App Actions
export const loadedPlug = (value = React.Fragment) => dispatch => {
    dispatch({
        type: SET_APP,
        payload: value
    });
}

export const setLCLState = (value) => dispatch => {
    dispatch({
        type: SET_APP_DATA,
        payload: value
    })
}

export const pushAppTask = (value) => dispatch => {
    dispatch({
        type: PUSH_APP_TASK,
        payload: value
    })
}

export const shiftAppTask = () => dispatch => {
    dispatch({
        type: SHIFT_APP_TASK,
        payload: { message: 'Task deleted'}
    })
}

export const clearAppTask = () => dispatch => {
    dispatch({
        type: CLEAR_APP_TASK,
        payload: { message: 'Tasks cleared' }
    })
}

export const processAppTask = (value) => dispatch => {
    switch (value.type) {
        // TODO: put the type string into a const
        // Maybe switch case is not needed, just in case if we need middleware processing
        case UPDATE_APP_DATA:
            dispatch({
                type: UPDATE_APP_DATA,
                payload: value.content,
                target: value.target
            })
            break;
            
        case UPDATE_APP_ACTION:
            dispatch({
                type: SET_AT_FIELD,
                payload: value.content
            })
            break;

        default:
            dispatch({
                type: value.type,
                payload: value.content
            })
            break;
    }
}