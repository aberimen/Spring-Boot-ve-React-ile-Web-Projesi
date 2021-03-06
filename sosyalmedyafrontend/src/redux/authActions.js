import { login, logout, signup } from '../api/apiCall';
import * as Actions from './Constants';

export const logoutSuccess = () => {
    return async dispatch => {
        try {
            await logout();
        } catch (err) {

        }
        dispatch({
            type: Actions.LOGOUT_SUCCESS
        });
    }
};

export const loginSuccess = payload => {
    return {
        type: Actions.LOGIN_SUCCESS,
        payload: payload
    };
};

export const updateSuccess = payload => {
    return {
        type: Actions.UPDATE_SUCCESS,
        payload
    };
};

export const loginHandler = credential => {
    return async dispatch => {
        const response = await login(credential);
        const { username, firstName, image } = response.data.user;
        const authObject = {
            username,
            firstName,
            password: credential.password,
            image,
            isLoggedIn: true,
            token: response.data.token
        };
        dispatch(loginSuccess(authObject));
        return response;
    };
};

export const signupHandler = user => {
    return async dispatch => {
        const response = await signup(user);
        await dispatch(loginHandler(user));

        return response;
    };
};