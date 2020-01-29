import React, {useRef} from 'react'
import ReactDOM from 'react-dom'
import {useSpring, useTransition, animated} from 'react-spring'

import { OuterDiv, TaskInfo } from "./Styles";
import {useDismiss} from "../../../../../Hooks/Hooks";

const BoardColumnTaskInfo = ({task, hide}) => {
    const inside = useRef();
    useDismiss(inside, hide);
    return ReactDOM.createPortal(
            <OuterDiv>
                <TaskInfo ref={inside}>
                    {task.priority}
                    <div dangerouslySetInnerHTML={{__html: task.description}}/>
                </TaskInfo>
            </OuterDiv>
        , document.querySelector('#modal'))
};

export default BoardColumnTaskInfo;