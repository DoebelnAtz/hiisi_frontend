export const formatDate = (date) => {
    let year = date.slice(0,4);
    let month = date.slice(5, 7);
    let day = date.slice(8, 10);
    let hour = date.slice(11,13);
    let minute = date.slice(14, 16);
    return day + '.' + month + '.' + year + ' at ' + hour + ':' + minute
};

export const  getUrlVars = () => {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
};

export const getUrlParam = (parameter, defaultValue) => {
    var urlParameter = defaultValue;
    if(window.location.href.indexOf(parameter) > -1){
        urlParameter = getUrlVars()[parameter];
    }
    return urlParameter;
};