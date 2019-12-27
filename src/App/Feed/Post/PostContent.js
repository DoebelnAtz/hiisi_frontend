import React from 'react'

import './post.css'

const PostContent = props => {

    return (
        <div className={'row post_content'}>
            <span>{props.content}</span>
        </div>
    )
};

export default PostContent