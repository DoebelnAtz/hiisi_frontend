import React, {useState} from 'react';
import {Reply} from "./Reply";
import { formatDate } from "../../../../utils/utils";

export const Comment = ({child,  renderComments, isExpanded}) => {
    const [expanded, setExpanded] = useState(isExpanded);
    const [commentThread, setCommentThread] = useState(child.children);


    if(expanded) {
        return (
            <div  className={'parent_comment'} key={child.id}>
                <button onClick={() => setExpanded(!expanded)} >-</button>
                <div className={'comment_head'}>
                    <img className={'comment_profile_pic'} src={child.creator.profile_pic} alt={'profile_pic'}/>
                    <span> {child.creator.username}</span>
                    <span> {formatDate(child.published_date)}</span>
                </div>
                <div className={'comment_body'}>
                    <p>{child.comment}</p>
                </div>
                <Reply commentThread={commentThread} setCommentThread={setCommentThread} comment_id={child.id} blog_id={null}/>
                <div className={'children'}>
                    {renderComments(commentThread, expanded)}
                </div>
            </div>
        )
    } else {
        return (
            <div  className={'parent_comment'}>
                <button onClick={() => setExpanded(!expanded)}>+</button>
            </div>
        )
    }
};