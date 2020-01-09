import React from 'react'

export default (props) => {
    return (
        <div className={props.className}>
            {props.text}
            {props.children}
        </div>
    )
}