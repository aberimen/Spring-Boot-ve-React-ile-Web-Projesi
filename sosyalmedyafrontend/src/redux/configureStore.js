import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import SecureLS from 'secure-ls';
import authReducer from './authReducer';

const ls = new SecureLS({ encodingType: 'aes', isCompression: false });

const getStateFromLocalStorage = () => {
    const authData = ls.get('auth-data');

    let stateInLocalStorage = {
        isLoggedIn: false,
        username: undefined,
        displayName: undefined,
        image: undefined,
        password: undefined
    };

    if (authData) {
        return authData;
    }

    return stateInLocalStorage;

}

const updateLocalStorage = newState =>{
    ls.set('auth-data', newState);
}

const configureStore = () => {
   
    const store = createStore(authReducer, getStateFromLocalStorage(),applyMiddleware(thunk));

    store.subscribe(() => {
        updateLocalStorage(store.getState());
    });

    return store;
}

export default configureStore;