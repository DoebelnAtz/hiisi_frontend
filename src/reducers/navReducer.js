export default (selectedNav = null, action) => {
    switch (action.type) {
        case 'UPDATE_NAV':
            return action.payload;
        default:
            return selectedNav;
    }
}