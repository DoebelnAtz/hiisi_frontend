import React, {useEffect, useState} from 'react';
import {Reply} from "./Reply";
import { formatDate } from "../../../../utils/utils";
import {makeRequest} from "../../../Api/Api";
import Button from "../../../Components/Buttons/Button";
import {useRequest} from "../../../../Hooks/Hooks";

export const Comment = ({focusList, child,  renderComments, isExpanded}) => {
    const [expanded, setExpanded] = useState(false);

    const [childThread, setChildThread, isLoading] = useRequest('blogs/commentthread/' + child.childthread, 'get')

    if (isExpanded) {
        return (
            <div className={'parent_comment'} key={child.c_id}>
                <div className={'comment_head'}>
                    <img className={'comment_profile_pic'} src={child.profile_pic} alt={'profile_pic'}/>
                    <div className={'comment_info'}>
                        <span>
                            {child.username} | {formatDate(child.comment_date)}
                            {(focusList.focus.includes(child.username))
                                    ? ' | ' + focusList.title
                                    : ''}</span>
                    </div>
                </div>
                <div className={'comment_body'}>
                    <span>{child.commentcontent}</span>
                </div>
                <div className={'row mr-0 px-0 comment_button_row'}>
                    {childThread.length ?
                    <Button
                        onClick={() => setExpanded(!expanded)}
                        customStyle={{margin: '0 var(--viewMargin) 0 0'}}
                    >
                        <i style={{fontSize: "13px", marginRight: "5px"}}
                           className="fas fa-comment-alt"
                        />
                        {!expanded ? 'Show Replies' : 'Hide'}
                        </Button>: <div> </div>}
                    <Reply commentThread={childThread} expandChildThread={setExpanded} setCommentThread={setChildThread} childThreadId={child.childthread}/>
                </div>
                <div className={'child_comments'}>
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