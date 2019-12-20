import React from 'react'

import PostTitle from './PostTitle'
import PostContent from './PostContent'
import ButtonRow from './PostButtonRow'

const Post = props => {
    const formatDate = (date) => {
        let year = date.slice(0,4);
        let month = date.slice(5, 7);
        let day = date.slice(8, 10);
        let hour = date.slice(11,13);
        let minute = date.slice(14, 16);
        return day + '.' + month + '.' + year + ' at ' + hour + ':' + minute
    };
    console.log(props);
        return (
            <div className={'container feed_item'}>
                <div className={'col'}>
                    <PostTitle title={props.content.title}
                               author={(props.content.creator) ? props.content.creator.username : 'Event'}
                               date={formatDate(props.content.published_date)}/>
                    <PostContent content={props.content.post}/>
                    <ButtonRow content={props.content}/>
                </div>
            </div>
        );
};

export default Post