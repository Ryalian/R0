import { 
    SET_APP_DATA,
    UPDATE_APP_DATA,
    SET_LCL
} from "../actions/types";

const initPlugData = {
    LCL: []
}

export default function(state = initPlugData, action) {
    let newState = {...state};
    switch (action.type) {
        //TODO: data may be better to move into app
        case SET_APP_DATA:
            // TODO: use same object convention for name as below
            let selectedName = action.payload.name;
            newState[selectedName] = action.payload.initData;
            return newState;

        case UPDATE_APP_DATA:
            newState[action.target] = Object.assign(newState[action.target], action.payload);
            newState[action.target] = {...newState[action.target]}
            return newState;
        case SET_LCL:
            newState.LCL = action.payload;
            return newState;
        default:
            return state;
    }
}