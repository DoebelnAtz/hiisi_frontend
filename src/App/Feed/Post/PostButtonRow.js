import React from 'react'

import './post.css'
import CommentButton from '../../Components/Buttons/CommentButton'
import LikeButton from '../../Components/Buttons/LikeButton'

const ButtonRow = props => {

        return (
            <div className={'row'}>
                <CommentButton comments={props.content.comments}/>
                <LikeButton likes={props.content.likes} />
            </div>
        );
};

export default ButtonRow