import React from 'react'

import './buttons.css'

export default (props) => {
    return (
        <div className={'like_button'}>
            <i className="fas fa-heart"></i><span className={'like_count'}>{props.likes}</span>
        </div>
    )
}