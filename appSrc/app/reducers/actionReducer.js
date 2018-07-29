import { 
    GET_ACTION,
    SET_ACTION,
    ADD_ACTION,
    DELETE_ACTION
} from "../actions/types";

const initAction = {
    items: []
}

export default function(state = initAction, action) {
    switch (action.type) {
        case GET_ACTION:
            // TODO: is this useful under redux?????
            return state;
        case SET_ACTION:
            return {
                ...state,
                items: [...action.payload]
            };
        case ADD_ACTION:
            return {
                ...state,
                items: [...state.items].concat(action.payload)
            };
        case DELETE_ACTION:
            return {
                ...state,
                items: []
            };
        default:
            return state;
    }
}