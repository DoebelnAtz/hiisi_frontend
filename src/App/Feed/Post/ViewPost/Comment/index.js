import React, {useEffect, useState} from 'react';
import Reply from "../Reply";
import { formatDate } from "../../../../../utils/utils";
import {makeRequest} from "../../../../Api/Api";
import Button from "../../../../Components/Buttons/Button";
import {useRequest} from "../../../../../Hooks/Hooks";

import {ParentComment, CommentHead, CommentBody, ChildComments, CommentInfo, ButtonRow} from "./Styles";

const CommentCard = ({odd, focusList, child,  renderComments, isExpanded}) => {
    const [expanded, setExpanded] = useState(false);

    const [childThread, setChildThread, isLoading] = useRequest('blogs/commentthread/' + child.childthread, 'get')

    if (isExpanded) {
        return (
            <ParentComment key={child.c_id} odd={odd}>
                <CommentHead>
                    <img src={child.profile_pic} alt={'profile_pic'}/>
                    <CommentInfo>
                        <span>
                            {child.username} | {formatDate(child.comment_date)}
                            {(focusList.focus.includes(child.username))
                                    ? ' | ' + focusList.title
                                    : ''}</span>
                    </CommentInfo>
                </CommentHead>
                <CommentBody>
                    <span>{child.commentcontent}</span>
                </CommentBody>
                <ButtonRow>
                    { !!childThread.length &&
                    <Button
                        onClick={() => setExpanded(!expanded)}
                        customStyle={{margin: '0 var(--viewMargin) 0 0'}}
                    >
                        <i style={{fontSize: "13px", marginRight: "5px"}}
                           className="fas fa-comment-alt"
                        />
                        {!expanded ? 'Show Replies' : 'Hide'}
                        </Button>}
                    <Reply
                        commentThread={childThread}
                        expandChildThread={setExpanded}
                        setCommentThread={setChildThread}
                        childThreadId={child.childthread}
                    />
                </ButtonRow>
                <ChildComments>
                    {renderComments(!odd, childThread, expanded)}
                </ChildComments>
            </ParentComment>
        )
    }
    else {
        return (
            <div>
            </div>
        )
    }

};

export default CommentCard;