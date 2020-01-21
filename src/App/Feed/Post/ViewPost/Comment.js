import React, {useEffect, useState} from 'react';
import {Reply} from "./Reply";
import { formatDate } from "../../../../utils/utils";
import {makeRequest} from "../../../Api/Api";
import Button from "../../../Components/Buttons/Button";

export const Comment = ({child,  renderComments, isExpanded}) => {
    const [expanded, setExpanded] = useState(false);
    const [childThread, setChildThread] = useState([]);

    const fetchReplies = async () => {
        let resp = await makeRequest('blogs/commentthread/' + child.childthread);
        setChildThread(resp.data);
    };

    useEffect(() => {
        fetchReplies()
    }, []);


    if (isExpanded) {
        return (
            <div className={'parent_comment'} key={child.c_id}>
                <div className={'comment_head'}>
                    <img className={'comment_profile_pic'} src={child.profile_pic} alt={'profile_pic'}/>
                    <span> {child.username}</span>
                    <span> {formatDate(child.comment_date)}</span>
                </div>
                <div className={'comment_body'}>
                    <span>{child.commentcontent}</span>
                </div>
                <div className={'row m-0 px-0 comment_button_row'}>
                    {childThread.length ?
                    <Button
                        onClick={() => setExpanded(!expanded)}
                        customStyle={{margin: '0 var(--viewMargin) 0 0'}}
                    >
                        {!expanded ? 'Expand' : 'Hide'}
                        </Button>: <div> </div>}
                    <Reply commentThread={childThread} expandChildThread={setExpanded} setCommentThread={setChildThread} childThreadId={child.childthread}/>
                </div>
                <div className={'children'}>
                    {renderComments(childThread, expanded)}
                </div>
            </div>
        )
    }
    else {
        return (
            <div>
            </div>
        )
    }

};