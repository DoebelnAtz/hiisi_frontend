import React from 'react'

import './buttons.css'

export default (props) => {
    return (
        <div className={'comment_button'}>
            <i className="fas fa-comment-alt"></i><span className={'comment_count'}>{props.comments.length}</span>
        </div>
    )
}