import React, { useState } from 'react'

import ViewPost from './ViewPost/ViewPost'
import PostMainContent from './PostMainContent'

const Post = ({content}) => {

    //  TODO: refactor the code for this component, too many child components.

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
                <ViewPost focusList={{focus: [content.username], title: 'author'}} content={content} commentthread={content.commentthread}/>
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