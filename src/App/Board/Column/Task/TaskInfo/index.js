import React, {useRef} from 'react'
import ReactDOM from 'react-dom'
import {useSpring, useTransition, animated} from 'react-spring'

import { OuterDiv, TaskDescription, TaskInfo, TaskTitle } from "./Styles";
import {useDismiss} from "../../../../../Hooks/Hooks";
import TextEditor from "../../../../Components/TextEditor";
import Button from "../../../../Components/Buttons/Button";
import {makeRequest} from "../../../../Api/Api";

const BoardColumnTaskInfo = ({task, hide}) => {

    const inside = useRef();
    useDismiss(inside, hide);

    const updateTask = () => {
        makeRequest('projects/boards/update_task', 'put', task)
    };

    return ReactDOM.createPortal(
            <OuterDiv>
                <TaskInfo ref={inside}>
                    <TaskTitle>{task.title}</TaskTitle><Button onClick={updateTask}>Save</Button>

                    <TaskDescription>
                        <TextEditor task={task}/>
                    </TaskDescription>
                </TaskInfo>
            </OuterDiv>
        , document.querySelector('#modal'))
};

export default BoardColumnTaskInfo;