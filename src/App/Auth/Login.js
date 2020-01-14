import React, { useState } from 'react'
import { makeRequest} from "../Api/Api";
import { withRouter } from 'react-router-dom'
import {setLocal} from "../../utils/utils";
import axios from "axios";

const Login = (props) => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const requestLogin = async (e) => {
        e.preventDefault();
        if (password.length && username.length) {
            let resp = await axios({
                //url: `http://134.209.227.11/api/${url}`,
                url: `http://localhost:5000/api/auth/login`,
                method: 'post',
                data: {
                    username: username,
                    password: password,
                }
            });
            console.log(resp);
            if (resp.data.success) {
                setLocal('token', resp.data);
                props.history.push('/blog');
            } else {
                props.history.push('/login')
            }
        }
    };

    return (
        <div className={'container'}>
            <div className={'col'}>
            <form>
                <div className={'row'}>
                    <input type={'text'}
                           name={'username'}
                           value={username}
                           onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className={'row'}>
                    <input type={'password'}
                           name={'password'}
                           value={password}
                           onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className={'row'}>
                    <button
                        onClick={requestLogin}
                    >
                        Login
                    </button>
                </div>
            </form>
            </div>
        </div>
    );
};

export default withRouter(Login)