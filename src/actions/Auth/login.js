import axios from 'axios'

export const requestLogin = (username, password) => async dispatch => {
    try {
        const response = await axios.post(
            "http://127.0.0.1:8002/api/auth/login/",
            {
                username: username,
                password: password
            }
            );
        console.log(response.data)
        window.localStorage.setItem('token', JSON.stringify(
            {id: response.data.user.id, token: response.data.token
            }));
        dispatch({type:"REQUEST_LOGIN", payload: response.data});

    }
    catch (e) {
        dispatch({type:"REQUEST_LOGIN_FAILED", payload: 'ERROR'});

    };

};


