import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import SecureLS from 'secure-ls';
import { setAuthorizatonHeader } from '../api/apiCall';
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
    const initialStrore = getStateFromLocalStorage();
    setAuthorizatonHeader(initialStrore);
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; 
    const store = createStore(authReducer, initialStrore,composeEnhancers(applyMiddleware(thunk)));

  
    store.subscribe(() => {
        updateLocalStorage(store.getState());
        setAuthorizatonHeader(store.getState());
    });

    return store;
}

export default configureStore;