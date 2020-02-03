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
    TaskFooter, TaskInfoBody,
    Collaborator, TaskSidebar,
    AddUserToTask, AddUserInput
} from "./Styles";

import { useDismiss } from "../../../../../Hooks/Hooks";
import TextEditor from "../../../../Components/TextEditor";
import Button from "../../../../Components/Buttons/Button";
import { makeRequest } from "../../../../Api/Api";
import Avatar from "../../../../Components/Avatar";


const BoardColumnTaskInfo = ({task, hide, getPriorityIcon}) => {

    const inside = useRef();
    const [priorityInputVal, setPriorityInputVal] = useState('');
    const [priorityIcon, setPriorityIcon] = useState(getPriorityIcon());

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
                return (
                    <Collaborator>
                        <Avatar key={collaborator.u_id} src={collaborator.profile_pic}/>
                    </Collaborator>
                )
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
                        <TaskSidebar>
                            <TaskCollaborators>{renderTaskCollaborators()}</TaskCollaborators>
                            <AddUserToTask><AddUserInput/></AddUserToTask>
                        </TaskSidebar>
                    </TaskInfoBody>
                    <TaskFooter>
                        <img src={priorityIcon}/>
                        <PriorityInput
                            value={priorityInputVal}
                            onChange={(e) => handleInputChange(e)}
                            style={{width: '32px'}}
                            placeholder={task.priority}
                        />
                    </TaskFooter>
                </TaskInfo>
            </OuterDiv>
        , document.querySelector('#modal'))
};

export default BoardColumnTaskInfo;