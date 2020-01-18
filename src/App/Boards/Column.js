import React, {useState} from 'react'

export default (props) => {

    const [inputVal, setInputVal] = useState('');

    return (
        <div className={props.className}>
            {props.text}
            <input
                style={{margin: '2px 2px', width: 'calc(100% - 4px)'}}
                placeholder={'add task'}
                onChange={(e) => setInputVal(e.target.value)}
                value={inputVal}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' && inputVal.length){
                        props.addTask(props.columnId, inputVal);
                        setInputVal('');
                    }
                }
                }
            />
            {props.children}
        </div>
    )
}