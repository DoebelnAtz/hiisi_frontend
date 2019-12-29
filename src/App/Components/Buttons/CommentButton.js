import React from 'react'

import { countComments } from "../../../utils/utils";
import './buttons.css'

export default (props) => {
    return (
        <div className={'comment_button'}>
            <i className="fas fa-comment-alt"></i><span className={'comment_count'}>{countComments(props.comments)}</span>
        </div>
    )
}