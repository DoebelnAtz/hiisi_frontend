import {useEffect} from "react";
import {makeRequest} from "../Api/Api";

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

export const useNav = (current, setFunc) => {
    useEffect(() => {
        setFunc(current);
    }, [current]);
};