import React, {Fragment} from 'react';

import Reply from './Reply';
import Comment from './Comment';
import {useRequest} from "../../../../Hooks/Hooks";
import {CommentSection} from "./Styles";

const ShowComments = (props) => {

    const [comments, setComments, isLoading] = useRequest(`blogs/commentthread/${props.commentthread}`, 'get');

    const renderComments = (odd=true, comment=comments, isExpanded=true) => {
        if (comment) {
            console.log(odd);
            return (
                comment.map((child) => {
                        return (
                            <div key={child.c_id}>
                                <Comment odd={odd} focusList={props.focusList} isExpanded={isExpanded} child={child} renderComments={renderComments}/>
                            </div>
                        )

                    }
                )
            )
        } else {
            return <div>Loading...</div>
        }
    };

    return (
        <Fragment>
            <CommentSection>
            <Reply
                commentThread={comments}
                setCommentThread={setComments}
                childThreadId={props.commentthread}
            />
            {!!comments.length &&
                    renderComments()
            }
            </CommentSection>
        </Fragment>
    );
};

export default ShowComments;
