import React, {Fragment, useState} from 'react'

import { makeRequest } from "../../../../Api/Api";
import Button from "../../../../Components/Buttons/Button";
import Input from "../../../../Components/Input";

const ReplyButton = (props) => {

    const [commentText, setCommentText] = useState('');
    const [opened, setOpened] = useState(false);

    const submitPost = async () => {
        if (commentText.length > 0) {
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
        props.expandChildThread && props.expandChildThread(true);
        setOpened(false)
    };

    if (!opened){
        return (
            <Button
                onClick={() => setOpened(true)}
            >
                Reply
            </Button>
        )
    } else {
        return (
            <Fragment>
                    <Button
                        onClick={() => setOpened(false)}
                        customStyle={{borderRight: '0', borderRadius: '4px 0 0 4px' }}
                    >
                        Cancel
                    </Button>
                    <Input
                        className={'comment_textarea'}
                        valueState={commentText}
                        customStyle={{borderRadius: '0', width: 'auto'}}
                        setValueState={setCommentText}
                        onEnter={submitPost}
                    />
                    <Button
                        onClick={() => submitPost()}
                        customStyle={{borderLeft: '0', borderRadius: '0 4px 4px 0' }}
                    >
                        Send
                    </Button>
            </Fragment>
        )
    }
};

export default ReplyButton;