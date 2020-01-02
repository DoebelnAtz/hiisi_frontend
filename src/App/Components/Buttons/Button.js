import React from 'react'

import './buttons.css'

const Button = (props) => {
    return (
        <button id={props.id} className={'basic_button'} style={props.customStyle}
                onClick={props.onClick}
                disabled={props.disabled}
        >
            {props.text}
        </button>
    )
};

export default Button