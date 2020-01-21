import React, { useState } from 'react'
import './viewpost.css'
import { makeRequest } from "../../../Api/Api";
import Button from "../../../Components/Buttons/Button";
import Input from "../../../Components/Input";
import GroupedInput from "../../../Components/GroupedInput";

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
            <div className={'reply_expanded'}>
                    <Button
                        onClick={() => submitPost()}
                        customStyle={{borderRight: '0', borderRadius: '4px 0 0 4px'}}
                    >

                        <i style={{fontSize: "13px", marginRight: "5px"}}
                           className="fas fa-comment-alt"
                        />
                        Send
                    </Button>
                    <Input
                        className={'comment_textarea'}
                        valueState={commentText}
                        customStyle={{borderRadius: '0', width: 'auto'}}
                        setValueState={setCommentText}
                        onKeyDown={(e) => handleEnterPress(e)}
                    />
                    <Button
                        onClick={() => setOpened(false)}
                        customStyle={{borderLeft: '0', borderRadius: '0 4px 4px 0'}}
                    >Cancel</Button>


            </div>
        )
    }
};