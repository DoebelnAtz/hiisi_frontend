import axios from 'axios';


export default axios.create({
    baseURL: 'http://127.0.0.1:8002/api/'
})

export const authLoginApi = (token) => {
    var data = {
        token: token
    }
};

