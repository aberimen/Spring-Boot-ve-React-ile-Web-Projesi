import * as Actions from './Constants';

export const logoutSuccess = () => {
    return {
        type: Actions.LOGOUT_SUCCESS
    };
};

export const loginSuccess = payload => {
    return {
        type: Actions.LOGIN_SUCCESS,
        payload: payload
    };
};