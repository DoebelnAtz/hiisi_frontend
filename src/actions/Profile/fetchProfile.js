import axios from '../../App/Api/Api'
//import _ from 'lodash'

export const fetchProfile = () => async dispatch => {
    const response = await axios.get('/profiles/1');
    dispatch({type: 'FETCH_PROFILE', payload: response.data});
};