import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
    userId: ''
};

const authVerifyEmail = (state, action) => {
    console.log('[reducer] ' + state.userId);
    return updateObject(state, {userId: action.userId});
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_VERIFY_EMAIL: return authVerifyEmail(state, action);
        default: return state;
    }
};

export default reducer;