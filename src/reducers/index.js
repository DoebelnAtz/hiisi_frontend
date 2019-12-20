import { combineReducers } from 'redux';
import navReducer from './navReducer'
import postReducer from './Posts/postReducer'
//import profileReducer from './Profiles'

export default combineReducers({
    posts: postReducer,
    nav: navReducer,
});