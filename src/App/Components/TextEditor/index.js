import React, {useState} from 'react';

import { TextEditor } from "./Styles";

import TextOutput from "./TextOutput";

const TextEditWindow = ({task}) => {
    const [output, setOutput] = useState(task.description);

    return (
        <TextEditor>
            <TextOutput task={task} output={output} setOutput={setOutput}/>
        </TextEditor>
    )
};

export default TextEditWindow;