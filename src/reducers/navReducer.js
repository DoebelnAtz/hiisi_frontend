export default (selectedNav = 'home', action) => {
    switch (action.type) {
        case 'UPDATE_NAV':
            return action.payload;
        default:
            return selectedNav;
    }
}