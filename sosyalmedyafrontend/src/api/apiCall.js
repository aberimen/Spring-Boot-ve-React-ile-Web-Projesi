import axios from "axios"


export const signup = user =>{
   return axios.post("/api/users", user);
}

export const login = creds =>{
    return axios.post("/api/auth", {}, {auth : creds});
}

export const changeLanguage = language =>{
    axios.defaults.headers['accept-language'] = language;
}