import * as Actions from './Constants';

const defaultState = {
    isLoggedIn: false,
    username: undefined,
    firstName: undefined,
    image: undefined,
    password: undefined
};

const authReducer = (state = { ...defaultState }, action) => {
    if (action.type === Actions.LOGOUT_SUCCESS) {
        return defaultState;
    } else if (action.type === Actions.LOGIN_SUCCESS) {
        return action.payload;
    } else if (action.type === Actions.UPDATE_SUCCESS) {
        return {
            ...state,
            ...action.payload
        };
    }

    return state;
}

export default authReducer;