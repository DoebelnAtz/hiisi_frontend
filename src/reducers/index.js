import { combineReducers } from 'redux';
import navReducer from './Nav/navReducer'
import postReducer from './Nav/Posts/postReducer'
import profileReducer from './Nav/Profile/profileReducer'
//import profileReducer from './Profiles'

export default combineReducers({
    posts: postReducer,
    nav: navReducer,
    profile: profileReducer,
});