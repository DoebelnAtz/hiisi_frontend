import axios from 'axios';
import {getLocal} from "../../utils/utils";

export const makeRequest = async (url, method, data, headers={}) => {
    let resp = await axios({
        url: `http://localhost:5000/api/${url}`,
        method: method,
        data: data,
        headers: {"Content-Type": "application/json", "Authorization": "Bearer " + (localStorage.getItem('token') ? getLocal('token').token : '') }
    }).catch(function (error) {
        console.log(error);
        if (!error.response) {
            window.location.replace("http://localhost:3000/505")
        }
        if (error.response.status === 401) {
            alert('Unauthorized');
            localStorage.clear();
            window.location.replace("http://localhost:3000/login")
        }
    });
    return (resp);
};




