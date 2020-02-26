import React, { useEffect} from 'react';
import {getUrlParam, setLocal,} from "../../Utils";
import { makeRequest } from "../../Api";

const Redirect = (props) => {

    const connect = async() => {
        let code = getUrlParam('code', '');

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
        setLocal('intra', resp);
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
