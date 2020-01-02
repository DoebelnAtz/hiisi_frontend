import React from 'react'

import PostTitle from "./PostTitle";
import {formatDate} from "../../../utils/utils";
import PostContent from "./PostContent";
import ButtonRow from "./PostButtonRow";



const PostMainContent = ({content, expand}) => {
    return (
        <div>
            <div className={'col'}>
                <PostTitle title={content.title}
                           author={(content.creator) ? content.creator.username : 'Event'}
                           date={formatDate(content.published_date)}/>
                <PostContent content={content.post}/>
                <ButtonRow expand={expand} content={content}/>
            </div>
        </div>
    )
};

export default PostMainContent
