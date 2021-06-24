import * as actionTypes from "./actionTypes";

export const authVerifyEmail = (userId) => {
    console.log('[action] ' + userId);
    return {
        type: actionTypes.AUTH_VERIFY_EMAIL,
        userId: userId
    }
}