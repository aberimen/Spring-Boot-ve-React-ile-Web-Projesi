import { createStore } from 'redux';
import authReducer from './authReducer';


const configureStore = () => {
    const authDataLocalStorage = localStorage.getItem('auth-data');

    let stateInLocalStorage = {
        isLoggedIn: false,
        username: undefined,
        displayName: undefined,
        image: undefined,
        password: undefined
    };

    if (authDataLocalStorage) {
        try {
            stateInLocalStorage = JSON.parse(authDataLocalStorage);
        } catch (error) { }
    }

    const store = createStore(authReducer, stateInLocalStorage, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

    store.subscribe(() => {
        localStorage.setItem('auth-data', JSON.stringify(store.getState()));
    });

    return store;
}

export default configureStore;