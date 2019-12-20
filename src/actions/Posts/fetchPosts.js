import axios from '../../App/Api/Api'
//import _ from 'lodash'

export const fetchPosts = () => async dispatch => {
    const response = await axios.get('/blogs/');
    dispatch({type: 'FETCH_POSTS', payload: response.data});
};
