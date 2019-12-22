import { combineReducers } from 'redux';
import navReducer from './Nav/navReducer'
import postReducer from './Nav/Posts/postReducer'
import profileReducer from './Nav/Profile/profileReducer'
import authLoginReducer from './Auth/authLoginReducer'
//import profileReducer from './Profiles'
import { sessionReducer } from 'redux-react-session';

export default combineReducers({
    posts: postReducer,
    nav: navReducer,
    profile: profileReducer,
    login: authLoginReducer,
    session: sessionReducer,
});