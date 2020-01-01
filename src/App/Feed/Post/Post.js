import React, { useState } from 'react'

import ViewPost from './ViewPost/ViewPost'
import PostMainContent from './PostMainContent'

const Post = ({content}) => {

    const [expanded, setExpanded] = useState(false);

    const expand = () => { // toggle expand
        if (!expanded){
            setExpanded(true)
        }
        else {
            setExpanded(false)
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