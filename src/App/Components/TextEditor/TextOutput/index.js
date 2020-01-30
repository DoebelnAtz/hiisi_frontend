import React, {Fragment, useEffect, useRef, useState} from 'react';

import {TextEditOutput, TextOutput} from "./Styles";

// To eliminate warning...

console.error = (function() {
    let error = console.error;

    return function(exception) {
        if ((exception + '').indexOf('Warning: A component is `contentEditable`') !== 0) {
            error.apply(console, arguments)
        }
    }
})();

const TextEditWindowOutput = ({task, output, setOutput}) => {

    const editOutput = useRef();
    const showOutput = useRef();
    const [editing, setEditing] = useState(false);

    const handleFocus = (e) => {
        if (!editOutput.current?.contains(e.target) && !showOutput.current?.contains(e.target)) {
            setEditing(false);
            console.log('ping');
        }
        else if (showOutput.current?.contains(e.target)) {
            setEditing(true);
            editOutput.current.focus();
            console.log('pong')
        }
    };

    const handleTabPress = (e) => { //doesn't work
        console.log(e.keyCode);
        if (e.keyCode === 9) {
            e.preventDefault();
            let space = new KeyboardEvent('keydown', {'keyCode': 32});

            for (var i = 0; i < 4; i++)
                document.dispatchEvent(space);
        }
    };

    const handleChange = (e) => {
        task.description = e.target.value;
        setOutput(e.target.value);
    };

    useEffect(() => {
        document.addEventListener('click', handleFocus);
        return () => {
            document.removeEventListener('click', handleFocus);
        };
    }, []);

    return (
        <Fragment>
            <TextOutput
                style={{ display: (!editing ? 'block' : 'none')}}
                ref={showOutput}
                dangerouslySetInnerHTML={{__html: output}}
            >
            </TextOutput>
            <TextEditOutput
                style={{display: (editing ? 'block' : 'none')}}
                ref={editOutput}
                value={output}
                onChange={(e) => handleChange(e)}
            >
            </TextEditOutput>
        </Fragment>
    )
};

export default TextEditWindowOutput;