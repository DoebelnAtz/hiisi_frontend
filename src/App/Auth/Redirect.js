import React, { useEffect} from 'react';
import axios from 'axios'
import { getUrlParam, } from "../../utils/utils";
import { makeRequest } from "../Api/Api";

const Redirect = (props) => {

    const connect = async() => {
        let code = getUrlParam('code', '');
        console.log(code);
        let resp = await makeRequest(
            "auth/connect/",
            'post',
            {
                code: code
            },
            {
                'Content-Type': 'application/json'
            }
        );
        localStorage.setItem('resp', JSON.stringify(resp));
        props.history.push('/home');
    };

    useEffect(() => {
        connect() // eslint-disable-next-line
    }, []);

        return (
            <div>
                <p>You are being redirected...</p>
            </div>
        );
};

export default Redirect;
