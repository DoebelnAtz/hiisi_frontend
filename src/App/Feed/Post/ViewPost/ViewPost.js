import React from 'react';

import './viewpost.css'
import {Reply} from "./Reply";
import {Comment} from "./Comment";

const ViewPost = (props) => {



    const renderComments = (comment=props.content.comments, isExpanded=true) => {
        return(
            comment.map((child) => {
                return (
                    <div>
                        <Comment isExpanded={isExpanded} child={child} renderComments={renderComments}/>
                    </div>
                )

            }
            )
        )
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
