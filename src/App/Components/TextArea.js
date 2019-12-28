import React from 'react'

import './components.css'

const TextArea = (props) => {
    return (
        <div className={'textarea_div'}>
            <div className={'row justify-content-center area_div'}>
                <textarea style={props.customStyle} className={'textarea_cont'} placeholder={props.placeholder}
                          onChange={props.onChange}
                >
                        {props.text}
                    </textarea>
            </div>
            <div className={'row justify-content-center counter'}>
                <p style={{color: props.count > props.max ? 'red' : 'black'}}>{props.count}/{props.max}</p>
            </div>
        </div>
    )
};

export default TextArea