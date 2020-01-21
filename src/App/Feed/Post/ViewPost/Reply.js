import React, { useState } from 'react'
import './viewpost.css'
import { makeRequest } from "../../../Api/Api";
import Button from "../../../Components/Buttons/Button";

export const Reply = (props) => {

    const [commentText, setCommentText] = useState('');
    const [opened, setOpened] = useState(false);

    const submitPost = async () => {
        if (commentText.length > 2) {
            let resp = await makeRequest('blogs/create_comment', 'post',
                {
                    content: commentText,
                    threadId: props.childThreadId
                },
                {
                    'Content-Type': 'application/json'
                }
            );
            props.setCommentThread([...props.commentThread, resp.data]);
        }
        props.expandChildThread(true);
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
            <Button
                onClick={() => setOpened(true)}
            >
                <i style={{fontSize: "13px", marginRight: "5px"}}
                   className="fas fa-comment-alt"
                />
                Reply
            </Button>
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