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

const TextEditWindowOutput = ({editable, state, setState}) => {

    const editOutput = useRef();
    const showOutput = useRef();
    const [editing, setEditing] = useState(false);

    const handleFocus = (e) => {
        if (!editOutput.current?.contains(e.target) && !showOutput.current?.contains(e.target)) {
            setEditing(false);

        }
        else if (showOutput.current?.contains(e.target)) {
            setEditing(true);
            editOutput.current.focus();

        }
    };

    const handleTabPress = (e) => { //doesn't work, something with react DnD

        if (e.keyCode === 9) {
            e.preventDefault();
            let space = new KeyboardEvent('keydown', {'keyCode': 32});

            for (var i = 0; i < 4; i++)
                document.dispatchEvent(space);
        }
    };

    const handleChange = (e) => {
    	let input = e.target.value;
        setState(input);
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
                style={{ display: (!editing || !editable ? 'block' : 'none')}}
                ref={showOutput}
                dangerouslySetInnerHTML={{__html: state}}
            >
            </TextOutput>
            <TextEditOutput
                style={{display: (editing && editable ? 'block' : 'none')}}
                ref={editOutput}
                value={state}
                onChange={(e) => handleChange(e)}
            >
            </TextEditOutput>
        </Fragment>
    )
};

export default TextEditWindowOutput;