import React from 'react'

import { countComments } from "../../../utils/utils";
import './buttons.css'

export default (props) => {
    return (
        <div onClick={props.expand} className={'comment_button'}>
            <i className="fas fa-comment-alt"></i><span className={'comment_count'}>Comment</span>
        </div>
    )
}