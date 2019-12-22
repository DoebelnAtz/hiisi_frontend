export default (state = [], action) => {
    switch (action.type) {
        case 'REQUEST_LOGIN':
            return action.payload;
        case 'REQUEST_LOGIN_FAILED':
            return action.payload;
        default:
            return state;
    }
};

