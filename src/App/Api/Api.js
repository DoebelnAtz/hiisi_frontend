import axios from 'axios';

export const makeRequest = async (url, method, data) => {
    let resp = await axios({
        url: `http://127.0.0.1:8002/api/${url}`,
        method: method,
        data: data
    });
    return (resp);
};



