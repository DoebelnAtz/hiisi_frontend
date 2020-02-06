import axios from 'axios';
import {getLocal} from "../../utils/utils";
import {useContext} from "react";

export const makeRequest = async (url, method, data) => {

    let resp;
    resp = await axios({
        url: `http://localhost:5000/api/${url}`,
        method: method,
        data: data,
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + (localStorage.getItem('token') ? getLocal('token').token : '')
        }
    });
    return (resp);
};




