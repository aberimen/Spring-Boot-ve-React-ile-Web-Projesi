import axios from "axios"


export const signup = user => {
    return axios.post("/api/users", user);
};

export const login = creds => {
    return axios.post("/api/auth", {}, { auth: creds });
}
    ;
export const changeLanguage = language => {
    axios.defaults.headers['accept-language'] = language;
};

export const getUsers = (page = 0, limit = 5) => {
    return axios.get(`/api/users?page=${page}&limit=${limit}`);
};

export const setAuthorizatonHeader = ({ username, password, isLoggedIn }) => {
    if (isLoggedIn) {
        axios.defaults.headers['Authorization'] = btoa(`${username}:${password}`);
        console.log("loginken: " + axios.defaults.headers['Authorization']);
    }
    else {
        delete axios.defaults.headers['Authorization'];
        console.log(axios.defaults.headers['Authorization']);
    }
};

export const getUserByUsername = (username) => {
    return axios.get(`/api/users/${username}`);
}

export const updateUser = (username, body) => {
    return axios.put(`/api/users/${username}`, body);
};

export const sendPost = (body) => {
    return axios.post('/api/posts', body);
};

export const getPosts = (page = 0) => {
    return axios.get('/api/posts?page=' + page);
};