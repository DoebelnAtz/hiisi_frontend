import axios from 'axios';
import { useState, useEffect } from 'react'

export const makeRequest = async (url, method, data, headers={}) => {
    let resp = await axios({
        url: `http://134.209.227.11/api/${url}`,
        method: method,
        data: data,
        headers: headers
    });
    return (resp);
};




