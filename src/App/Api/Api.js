import axios from 'axios';
import { useState, useEffect } from 'react'
import {getLocal} from "../../utils/utils";

export const makeRequest = async (url, method, data, headers={}) => {
    let resp = await axios({
        //url: `http://134.209.227.11/api/${url}`,
        url: `http://localhost:5000/api/${url}`,
        method: method,
        data: data,
        headers: {"Content-Type": "application/json", "Authorization": "Bearer " + getLocal('token').token}
    }).catch(function (error) {
        console.log(error);
        if (!error.response) {
            window.location.replace("http://localhost:3000/505")
        }
        if (error.response.status === 401 || error.response.status === 400) {
            //localStorage.clear();
            //window.location.replace("http://localhost:3000/login")
        }
    });
    return (resp);
};




