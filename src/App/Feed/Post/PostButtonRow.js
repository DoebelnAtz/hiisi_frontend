import React from 'react'

import './post.css'
import CommentButton from '../../Components/Buttons/CommentButton'
import LikeButton from '../../Components/Buttons/LikeButton'

const ButtonRow = ({content}) => {

        return (
            <div className={'row'}>
                <CommentButton comment_count={content.comment_count}/>
                <LikeButton likes={content.likes} />
            </div>
        );
};

export default ButtonRow