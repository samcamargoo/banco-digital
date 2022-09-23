import  axios  from 'axios';



export const api = axios.create({
    baseURL: ' http://localhost:8080/api/v1/'
    
});


export function setToken(token: string) {
    api.defaults.headers.common['Authorization'] = '';
    delete axios.defaults.headers.common['Authorization'];

    
    if(token) {
        api.defaults.headers.common['Authorization'] = 'Bearer ' +token;    
    }
}