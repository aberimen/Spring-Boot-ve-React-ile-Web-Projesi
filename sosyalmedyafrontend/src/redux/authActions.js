import { login } from '../api/apiCall';
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

export const loginHandler = credential => {
    return async dispatch => {
        const response = await login(credential);
        const { username, firstName, image } = response.data;
        const authObject = {
            username,
            displayName: firstName,
            password : credential.password,
            image,
            isLoggedIn: true
        };
        dispatch(loginSuccess(authObject));
        return response;
    }


}