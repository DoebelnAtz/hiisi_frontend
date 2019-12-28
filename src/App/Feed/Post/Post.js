import React, { useState } from 'react'

import ViewPost from './ViewPost/ViewPost'
import PostMainContent from './PostMainContent'

const Post = (props) => {

    const [expanded, setExpanded] = useState(false);
    const content = props.content;

    const expand = () => { // toggle expand
        if (expanded){
            setExpanded(false)
        }
        else {
            setExpanded(true)
        }
    };

    if (expanded) {
        return (
            <div  className={'feed_item'}>
                <PostMainContent expand={expand} content={content}/>
                <ViewPost content={content}/>
            </div>
        );
    } else {
        return (
            <div className={'feed_item'}>
                <PostMainContent expand={expand} content={content}/>
            </div>
        );
    }
};

export default Post