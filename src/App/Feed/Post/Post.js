import React, { useState } from 'react'

import { formatDate } from "../../../utils/utils";
import PostTitle from './PostTitle'
import PostContent from './PostContent'
import ButtonRow from './PostButtonRow'
import ViewPost from './ViewPost/ViewPost'

const Post = (props) => {

    const [expanded, setExpanded] = useState(false);

    const content = props.content;

    const expand = () => {
        if (expanded){
            setExpanded(false)
        }
        else {
            setExpanded(true)
        }
    };

    if (expanded) {
        return (
            <div>
                <button
                onClick={expand}
                >Back</button>
                <ViewPost content={content}/>
            </div>

        );
    } else {
        return (
            <div className={'container feed_item'}
            onClick={expand}>
                <div className={'col'}>
                    <PostTitle title={content.title}
                               author={(content.creator) ? content.creator.username : 'Event'}
                               date={formatDate(content.published_date)}/>
                    <PostContent content={content.post}/>
                    <ButtonRow content={content}/>
                </div>
            </div>
        );
    }

};

export default Post