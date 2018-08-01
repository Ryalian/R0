import {
    SET_AT_FIELD,
} from './types'

// ACTION actions
export const setAction = (value) => dispatch => {
    dispatch({
        type: SET_AT_FIELD,
        payload: value
    })
}

export const coreSetAction = (value) => dispatch => {
    dispatch({
        type: SET_AT_FIELD,
        payload: value
    })
}