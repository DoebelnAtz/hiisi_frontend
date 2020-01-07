export const formatDate = (date, event) => {
    if (event) {
        let year = date.slice(0,4);
        let month = date.slice(5, 7);
        let day = date.slice(8, 10);
        let hour = date.slice(11,13);
        let minute = date.slice(14, 16);
        return day + '.' + month + '.' + year + ' at ' + (parseInt(hour, 10) + 2) + ':' + minute
    } else {
        return (calculateTimeSince(date))
    }

};

export const  getUrlVars = () => {
    var vars = {};
    window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
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

export const countComments = (comments, count = 0) => {
    for (var i=0; i < comments.length; i++)
    {
        count = countComments(comments[i].children, ++count)
    }
    return(count)
};

export const checkFriendList = (profile, username) => {
    let friendList = profile.friends;
    for (var i = 0; i < friendList.length; i++) {
        if (friendList[i].username === username){
            return false
        }
    }
    return true;
};

export const calculateTimeSince = (isoString) => {
    let then = new Date(isoString);
    var seconds = Math.floor((new Date() - then) / 1000);

    var interval = Math.floor(seconds / 31536000);

    if (interval > 1) {
        return interval + ((interval === 1) ? " year": " years") + " ago";
    }
    interval = Math.floor(seconds / 2592000);
    if (interval >= 1) {
        return interval + ((interval === 1)? " month": "months") + " ago";
    }
    interval = Math.floor(seconds / 86400);
    if (interval >= 1) {
        return interval + ((interval === 1) ? " day": " days") + " ago";
    }
    interval = Math.floor(seconds / 3600);
    if (interval >= 1) {
        return interval + ((interval === 1) ? " hour": " hours") + " ago";
    }
    interval = Math.floor(seconds / 60);
    if (interval >= 1) {
        return interval + ((interval === 1) ? " minute": " minutes") + " ago";
    }
    return Math.floor(seconds) + ((Math.floor(seconds) === 1) ? " second": " seconds") + " ago";
};

export const checkLikedPosts = (profile, blogPost) => {
    if (!profile || !blogPost)
        return true;
    for (var i = 0; i < profile.liked_posts.length; i++) {
        if (profile.liked_posts[i].id === blogPost.id) {
            return false
        }
    }
    return true
};
