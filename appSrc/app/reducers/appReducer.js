import {
    SET_APP
} from '../actions/types'

export default function(state = null, action) {
    switch (action.type) {
        case SET_APP:
            return action.payload || false;
        default:
            return state;
    }
}