import React, {useRef, useState} from 'react'
import ReactDOM from 'react-dom'
import {useSpring, useTransition, animated} from 'react-spring'

import {
    OuterDiv,
    TaskDescription,
    TaskInfo,
    TaskTitle,
    TaskInfoHead,
    PriorityInput,
    TaskCollaborators,
    TaskFooter, TaskInfoBody
} from "./Styles";
import {useDismiss} from "../../../../../Hooks/Hooks";
import TextEditor from "../../../../Components/TextEditor";
import Button from "../../../../Components/Buttons/Button";
import {makeRequest} from "../../../../Api/Api";
import Input from "../../../../Components/Input";
import Avatar from "../../../../Components/Avatar";


const BoardColumnTaskInfo = ({task, hide, getPriorityIcon}) => {

    const inside = useRef();

    const [priorityInputVal, setPriorityInputVal] = useState('');
    const [priorityIcon, setPriorityIcon] = useState(getPriorityIcon());

    const fade = useSpring({opacity:})

    useDismiss(inside, hide);

    const updateTask = async () => {
        await makeRequest('projects/boards/update_task', 'put', task)
    };

    const handleInputChange = (e) => {
        console.log(e.target.value);
        setPriorityInputVal(e.target.value);
        task.priority = e.target.value;
        setPriorityIcon(getPriorityIcon(Number(e.target.value)))
    };

    const renderTaskCollaborators = () => {
        return (
            task.collaborators.map(collaborator => {
                return (<Avatar key={collaborator.u_id} src={collaborator.profile_pic}/>)
            })
        )
    };

    return ReactDOM.createPortal(
            <OuterDiv>
                <TaskInfo ref={inside}>
                    <TaskInfoHead>
                        <Button onClick={updateTask}>
                            Save
                        </Button>
                        <TaskTitle>
                            {task.title}
                        </TaskTitle>
                    </TaskInfoHead>
                    <TaskInfoBody>
                        <TaskDescription>
                            <TextEditor task={task}/>
                        </TaskDescription>
                    </TaskInfoBody>
                    <TaskFooter>
                        <img src={priorityIcon}/>
                        <PriorityInput value={priorityInputVal} onChange={(e) => handleInputChange(e)} style={{width: '32px'}} placeholder={task.priority}/>
                        <TaskCollaborators>{renderTaskCollaborators()}</TaskCollaborators>
                    </TaskFooter>
                </TaskInfo>
            </OuterDiv>
        , document.querySelector('#modal'))
};

export default BoardColumnTaskInfo;