import { makeRequest } from '../../App/Api/Api'
//import _ from 'lodash'

export const fetchPosts = () => async dispatch => {
    const response = await makeRequest('blogs/', 'get', {});
    dispatch({type: 'FETCH_POSTS', payload: response.data});
};
