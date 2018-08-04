import { SET_LCL } from "./types";

export const setLCL = (value = []) => dispatch => {
    dispatch({
        type: SET_LCL,
        payload: value
    });
}