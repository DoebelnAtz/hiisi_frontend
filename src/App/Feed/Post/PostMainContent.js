import React from 'react'

import PostTitle from "./PostTitle";
import {formatDate} from "../../../utils/utils";
import PostContent from "./PostContent";
import ButtonRow from "./PostButtonRow";



const PostMainContent = (props) => {
    console.log(props.content);
    let content = props.content;
    return (
        <div
             onClick={props.expand}>
            <div className={'col'}>
                <PostTitle title={content.title}
                           author={(content.creator) ? content.creator.username : 'Event'}
                           date={formatDate(content.published_date)}/>
                <PostContent content={content.post}/>
                <ButtonRow content={content}/>
            </div>
        </div>
    )
};

export default PostMainContent
