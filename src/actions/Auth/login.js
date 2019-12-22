import axios from 'axios'

export const requestLogin = (username, password) => async dispatch => {
    const response = await axios.post(
        "http://127.0.0.1:8002/api/auth/login/",
        {
            username: username,
            password: password
        }
        );
    if (response.status === 400)
        dispatch({type:"REQUEST_LOGIN_FAILED", payload: 'ERROR'});
    else
        dispatch({type:"REQUEST_LOGIN", payload: response.data});
};


