export const currentNav = (selected) => {
    console.log(selected);
    return {type:'UPDATE_NAV', payload: selected}
};