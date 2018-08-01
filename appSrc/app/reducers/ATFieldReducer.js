import { 
    GET_AT_FIELD,
    SET_AT_FIELD,
    ADD_AT_FIELD,
    DELETE_AT_FIELD
} from "../actions/types";

const initAction = {
    items: []
}

export default function(state = initAction, action) {
    switch (action.type) {
        case GET_AT_FIELD:
            // TODO: is this useful under redux?????
            return state;
        case SET_AT_FIELD:
            return {
                ...state,
                items: [...action.payload]
            };
        case ADD_AT_FIELD:
            return {
                ...state,
                items: [...state.items].concat(action.payload)
            };
        case DELETE_AT_FIELD:
            return {
                ...state,
                items: []
            };
        default:
            return state;
    }
}