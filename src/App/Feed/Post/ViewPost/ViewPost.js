import React, { useState } from 'react';

import './viewpost.css'
import {Reply} from "./Reply";
import {Comment} from "./Comment";
import {useFetch} from "../../../Hooks/Hooks";

// TODO: Render comments dynamically, fetch comments from api only after user expands post.

const ViewPost = (props) => {

    const [comments, setComments] = useState([]);
    useFetch(`comment_threads/${props.content.thread}`, setComments);

    const renderComments = (comment=comments.comment, isExpanded=true) => {
        if (comment) {
            return (
                comment.map((child) => {
                        return (
                            <div key={child.id}>
                                <Comment isExpanded={isExpanded} child={child} renderComments={renderComments}/>
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
        <div id={'view_post_container'} className={'container pb-1'}>
            <Reply comment_id={null} blog_id={props.content.id} />
            <div className={'comment_section'}>
                {renderComments()}
            </div>
        </div>
    );
};

export default ViewPost;
