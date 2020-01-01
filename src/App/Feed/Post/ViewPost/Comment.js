import React, {useState} from 'react';
import {Reply} from "./Reply";

export const Comment = ({child,  renderComments, isExpanded}) => {
    const [expanded, setExpanded] = useState(isExpanded);
    if(expanded) {
        return (
            <div  className={'parent_comment'} key={child.id}>
                <button onClick={() => setExpanded(!expanded)} >HIDE</button>
                <div className={'comment_head'}>
                    <img className={'comment_profile_pic'} src={child.creator.profile_pic}/>
                    <span> {child.creator.username}</span>
                </div>
                <div className={'comment_body'}>
                    <p>{child.comment}</p>
                </div>
                <Reply comment_id={child.id} blog_id={null}/>
                <div className={'children'}>
                    {renderComments(child.children, expanded)}
                </div>
            </div>
        )
    } else {
        return (
            <button onClick={() => setExpanded(!expanded)}>SHOW</button>
        )
    }
};