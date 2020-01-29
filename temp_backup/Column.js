import React, {useState} from 'react'
import Input from "../Components/Input";

export default (props) => {

    const [inputVal, setInputVal] = useState('');

    return (
        <div className={props.className}>
            <span className={'column_title'}>{props.text}</span>
            <Input
                customStyle={{margin: '2px 2px', width: 'calc(100% - 4px)'}}
                placeholder={'add task'}
                setValueState={setInputVal}
                valueState={inputVal}
                onEnter={() => {if (inputVal.length){
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