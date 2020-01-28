
export const selectNav = (currentNav) => {
    return {
        type: 'change_nav',
        payload: currentNav
    }
};

export const hoverNav = (currentHover) => {
    return {
        type: 'new_hover',
        payload: currentHover
    }
};

export const stopHover = () => {
    return {
        type: 'no_hover',
        payload: ''
    }
};