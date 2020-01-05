import axios from 'axios';
import { useState, useEffect } from 'react'

export const makeRequest = async (url, method, data, headers={}) => {
    let resp = await axios({
        url: `http://134.209.227.11/api/${url}`,
        //url: `http://127.0.0.1:8002/api/${url}`,
        method: method,
        data: data,
        headers: headers
    }).catch(function (error) {
        if (!error.response) {
            window.location.replace("http://localhost:3000/505")
        }
        if (error.response.status === 401 || error.response.status === 400) {
            localStorage.clear();
            window.location.replace("http://localhost:3000/login")
        }
    });
    return (resp);
};




