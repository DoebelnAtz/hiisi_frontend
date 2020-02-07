import React, {useState} from 'react';

import { TextEditor } from "./Styles";

import TextOutput from "./TextOutput";

const TextEditWindow = ({state, setState}) => {


    return (
        <TextEditor>
            <TextOutput state={state} setState={setState}/>
        </TextEditor>
    )
};

export default TextEditWindow;