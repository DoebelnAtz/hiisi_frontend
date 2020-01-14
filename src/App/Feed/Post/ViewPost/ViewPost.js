import React, { useState, useEffect } from 'react';

import './viewpost.css'
import {Reply} from "./Reply";
import {Comment} from "./Comment";
import {makeRequest} from "../../../Api/Api";

const ViewPost = (props) => {

    const [comments, setComments] = useState([]);

    const getComments = async() => {
        let resp = await makeRequest(`blogs/commentthread/${props.content.commentthread}`, 'get', {});

        setComments(resp.data);
    };

    useEffect(() => {
        getComments() // eslint-disable-next-line
    }, []);

    const renderComments = (comment=comments, isExpanded=true) => {
        if (comment) {
            return (
                comment.map((child) => {
                        return (
                            <div key={child.c_id}>
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
            {/*<Reply commentThread={comments} setCommentThread={setComments} comment_id={null} blog_id={props.content.id} />*/}
            <div className={'comment_section'}>
                {renderComments()}
            </div>
        </div>
    );
};

export default ViewPost;
