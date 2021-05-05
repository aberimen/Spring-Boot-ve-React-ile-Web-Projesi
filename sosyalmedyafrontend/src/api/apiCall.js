import axios from "axios"


export const signup = user => {
    return axios.post("/api/users", user);
};

export const login = creds => {
    return axios.post("/api/auth", creds);
}
    ;
export const changeLanguage = language => {
    axios.defaults.headers['accept-language'] = language;
};

export const getUsers = (page = 0, limit = 5) => {
    return axios.get(`/api/users?page=${page}&limit=${limit}`);
};

export const setAuthorizatonHeader = ({ token, isLoggedIn }) => {
    if (isLoggedIn) {
        axios.defaults.headers['Authorization'] = `Bearer ${token}`;
    }
    else {
        delete axios.defaults.headers['Authorization'];
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

export const getPosts = (username, page = 0) => {
    const url = username ? `/api/users/${username}/posts?page=` : '/api/posts?page=';
    return axios.get(url + page);
};

export const getOldPosts = (username, id) => {
    const url = username ? `/api/users/${username}/posts/` : '/api/posts/';
    return axios.get(url + id);
};

export const getNewPostCount = (username, id) => {
    const url = username ? `/api/users/${username}/posts/${id}?count=true` : `/api/posts/${id}?count=true`;
    return axios.get(url);
};

export const getNewPosts = (username, id) => {
    const url = username ? `/api/users/${username}/posts/${id}?direction=after` : `/api/posts/${id}?direction=after`;

    return axios.get(url);
};

export const sendPostAttachment = attachment => {
    return axios.post('/api/post-attachments', attachment);
};

export const deletePost = id => {
    return axios.delete('/api/posts/' + id);
};

export const deleteUser = username => {
    return axios.delete('/api/users/' + username);
};