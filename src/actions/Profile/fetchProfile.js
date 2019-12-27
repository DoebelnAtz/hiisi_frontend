import { makeRequest } from '../../App/Api/Api'
//import _ from 'lodash'

export const fetchProfile = (id) => async dispatch => {
    const response = await makeRequest('/profiles/' + id, + 'get', {});

    dispatch({type: 'FETCH_PROFILE', payload: response.data});
};