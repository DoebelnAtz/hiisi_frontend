import axios from 'axios';
import { useState, useEffect } from 'react'

export const makeRequest = async (url, method, data) => {
    let resp = await axios({
        url: `http://127.0.0.1:8002/api/${url}`,
        method: method,
        data: data
    });
    return (resp);
};

export const useFetch = (url, setFunc) => {

    // empty array as second argument equivalent to componentDidMount
    useEffect(() => {
        async function fetchData() {
            const response = await makeRequest(url, 'get', {});
            const json = response.data;
            setFunc(json);
        }
        fetchData();
    }, [url]);
};



