import React from 'react';

import {
    SET_APP
} from './types'

export const setApp = (values = React.Fragment) => dispatch => {
    dispatch({
        type: SET_APP,
        payload: values
    });
}