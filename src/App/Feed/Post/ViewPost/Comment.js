import React, {useEffect, useState} from 'react';
import {Reply} from "./Reply";
import { formatDate } from "../../../../utils/utils";
import {makeRequest} from "../../../Api/Api";

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
                    <p>{child.commentcontent}</p>
                </div>
                {/*<Reply commentThread={childThread} setCommentThread={setChildThread} childThreadId={child.c_id}/>*/}
                <div className={'children'}>
                    {childThread.length ? <button onClick={() => setExpanded(!expanded)}>{childThread.length + (childThread.length == 1 ?' reply' : ' replies')}</button> : <div> </div>}
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