import * as Actions from './Constants';

const defaultState = {
    isLoggedIn: false,
    username: undefined,
    displayName: undefined,
    image: undefined,
    password: undefined
};

const authReducer = (state = { ...defaultState }, action) => {
    if (action.type === Actions.LOGOUT_SUCCESS) {
        return defaultState;
    }
    if (action.type === Actions.LOGIN_SUCCESS) {
        return action.payload;
    }
    return state;

}

export default authReducer;