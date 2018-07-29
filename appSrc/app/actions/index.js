import React from 'react';

import {
    SET_APP,
    SET_APP_DATA,
    UPDATE_APP_DATA,
    UPDATE_APP_STATE,
    UPDATE_APP_ACTION,

    PUSH_APP_TASK,
    SHIFT_APP_TASK,
    PROCESS_APP_TASK,

    GET_ACTION,
    SET_ACTION,
    ADD_ACTION,
    DELETE_ACTION,

    CORE_SET_ACTION
} from './types'


// App Actions
export const setApp = (value = React.Fragment) => dispatch => {
    dispatch({
        type: SET_APP,
        payload: value
    });
}

export const setAppState = (value) => dispatch => {
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
        payload: { message: 'Task complete'}
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
                type: SET_ACTION,
                payload: value.content
            })
            console.log('Update actions ', value)
            break;

        case UPDATE_APP_STATE:
            break;

        default:
            break;
    }
}


// ACTION actions
export const setAction = (value) => dispatch => {
    dispatch({
        type: SET_ACTION,
        payload: value
    })
}

export const coreSetAction = (value) => dispatch => {
    dispatch({
        type: SET_ACTION,
        payload: value
    })
}