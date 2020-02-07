import React, {useState} from 'react';

import { TextEditor } from "./Styles";

import TextOutput from "./TextOutput";

const TextEditWindow = ({editable, state, setState}) => {


    return (
        <TextEditor>
            <TextOutput editable={editable} state={state} setState={setState}/>
        </TextEditor>
    )
};

export default TextEditWindow;