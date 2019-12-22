import axios from '../../App/Api/Api'
//import _ from 'lodash'

export const fetchProfile = (id) => async dispatch => {
    const response = await axios.get('/profiles/' + id);

    dispatch({type: 'FETCH_PROFILE', payload: response.data});
};