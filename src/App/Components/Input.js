import React from 'react'

import './Buttons/buttons.css'

const Input = (props) => {
    return (
        <input
            id={props.id} className={'basic_input'}
            style={props.customStyle}
            disabled={props.disabled}
            value={props.valueState}
            placeholder={props.placeholder}
            onChange={(e) => {props.setValueState(e.target.value);}}
            onKeyDown={(e) => {if (e.key === 'Enter' ) props.onEnter()}}
        />
    )
};

export default Input