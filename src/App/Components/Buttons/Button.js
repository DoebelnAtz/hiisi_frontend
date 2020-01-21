import React from 'react'

import './buttons.css'

const Button = (props) => {
    return (
        <button id={props.id} className={`basic_button ${props.noRadius ? 'noRadius' : ''}`} style={props.customStyle}
                onClick={props.onClick}
                disabled={props.disabled}
        >
            {props.text}
            {props.children}
        </button>
    )
};

export default Button