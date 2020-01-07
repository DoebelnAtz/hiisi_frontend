import React, { useState } from 'react'
import './viewpost.css'
import { makeRequest } from "../../../Api/Api";

export const Reply = (props) => {

    const [commentText, setCommentText] = useState('');
    const [opened, setOpened] = useState(false);

    const submitPost = async () => {
        let now = new Date().toISOString();
        if (commentText.length > 2) {
            let resp = await makeRequest('create_comment/', 'post',
                {
                    comment_text: commentText,
                    user_id: JSON.parse(localStorage.getItem('token')).user.id,
                    blog_id: props.blog_id,
                    comment_parent: props.comment_id,
                    published_date: now
                },
                {
                    'Content-Type': 'application/json'
                }
            );
            props.setCommentThread([...props.commentThread, resp.data]);
        }
        setOpened(false)
    };

    const handleEnterPress = (event) => {
        if (event.key === "Enter") {
            submitPost();
        }
    };
    if (!opened){
        return (
            <div>
                <button onClick={() => setOpened(true)}><i style={{fontSize: "13px", marginRight: "5px"}} className="fas fa-comment-alt"/>Reply</button>
            </div>
        )
    } else {
        return (
            <div className={'container'}>
                <div className={'row'}>
                    <textarea className={'comment_textarea'} value={commentText}
                              onChange={(e) => setCommentText(e.target.value)}
                              onKeyDown={(e) => handleEnterPress(e)}
                    />
                </div>
                <div className={'row'}>
                    <button onClick={() => submitPost()}><i style={{fontSize: "13px", marginRight: "5px"}} className="fas fa-comment-alt"/>Send</button>
                    <button onClick={() => setOpened(false)}>Cancel</button>
                </div>
            </div>
        )
    }
};