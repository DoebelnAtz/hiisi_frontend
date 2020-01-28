import { combineReducers} from 'redux';

const currentNavReducer = (currentNav = "blogs", action) => {
    if (action.type === 'change_nav') {
        return action.payload;
    } else {
        return currentNav
    }
};

const hoveredNavReducer = (currentHover = '', action) => {
    if (action.type === 'new_hover') {
        return action.payload
    } else if (action.type === 'no_hover') {
        return ''
    }
    else {
        return currentHover
    }
};

export default combineReducers({
    currentNav: currentNavReducer,
    hoveredNav: hoveredNavReducer
})