import React from 'react'

import './post.css'
import CommentButton from '../../Components/Buttons/CommentButton'
import LikeButton from '../../Components/Buttons/LikeButton'

const ButtonRow = ({content, expand}) => {

        return (
            <div className={'row noselect'}>
                <CommentButton expand={expand} comment_count={content.comment_count}/>
                <LikeButton likes={content.likes} />
            </div>
        );
};

export default ButtonRow