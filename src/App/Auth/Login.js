import React, { useState } from 'react'
import { makeRequest} from "../Api/Api";
import { withRouter } from 'react-router-dom'

const Login = (props) => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const requestLogin = async (e) => {
        e.preventDefault();
        if (password.length && username.length) {
            let resp = await makeRequest('auth/login/', 'post',
                {
                    username: username,
                    password: password,
                },);
            if (resp.data.user) {
                localStorage.setItem('token', JSON.stringify(resp.data));
                props.history.push('/home');
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