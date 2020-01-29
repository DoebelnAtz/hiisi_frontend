import React from 'react'

import './components.css'

const Input = (props) => {
    return (
        <input
            id={props.id} className={'basic_input'}
            style={props.customStyle}
            disabled={props.disabled}
            value={props.valueState}
            placeholder={props.placeholder}
            onChange={(e) => {props.setValueState(e.target.value); props.onChange && props.onChange(e);}}
            onKeyDown={(e) => {if (e.key === 'Enter' ) {props.onEnter(e); props.setValueState('')}}}
        />
    )
};

export default Input