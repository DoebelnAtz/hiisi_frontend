import {useContext, useEffect, useState} from "react";
import {makeRequest} from "../App/Api/Api";
import CurrentNavContext from "../Context/CurrentNavContext";
import ErrorContext from '../Context/ErrorContext'

export const useNav = (current) => {
    const {setCurrentNav} = useContext(CurrentNavContext);
    useEffect(() => {
        setCurrentNav(current);
    }, [current]);
};

export const useRequest = (url, method, body={}) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const {error, setError} = useContext(ErrorContext);

    let resp;
    useEffect(() => {
        async function request () {
            try {
                setIsLoading(true);
                resp = await makeRequest(url, method, body);
                setData(resp.data);
            } catch (e) {
                setError(JSON.stringify(e.response.status));

            } finally {
                setIsLoading(false)
            }
        }
        request();
    }, []);
    return [data, setData, isLoading]
};