import React, {useEffect, useRef, useState} from 'react'
import ReactDOM from 'react-dom'

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

import {useDismiss, useRequest} from "../../../../../Hooks/Hooks";
import TextEditor from "../../../../Components/TextEditor";
import Button from "../../../../Components/Buttons/Button";
import { makeRequest } from "../../../../Api/Api";
import Avatar from "../../../../Components/Avatar";
import {getPriorityIcon} from "../../../../../utils/taskUtils";


const BoardColumnTaskInfo = (props) => {

    const inside = useRef();
    const [task, setTask, isLoading] = useRequest('projects/boards/tasks/' + props.match.params.tid);
    const [priorityInputVal, setPriorityInputVal] = useState('');

    const [priorityIcon, setPriorityIcon] = useState(getPriorityIcon(0));

    useEffect(() => {
        setPriorityIcon(getPriorityIcon(task.priority))
    }, [isLoading]);

    const close = () => {
        props.history.push('/projects/1')

    };

    useDismiss(inside, close);

    const updateTask = async () => {
        await makeRequest('projects/boards/update_task', 'put', task)
    };

    const handleInputChange = (e) => {
        console.log(e.target.value);
        setPriorityInputVal(e.target.value);
        setTask({...task, priority: e.target.value});
        setPriorityIcon(getPriorityIcon(Number(e.target.value)))
    };

    const renderTaskCollaborators = () => {
        return (
            task.collaborators.map(collaborator => {
                return (
                    <Collaborator key={collaborator.u_id}>
                        <Avatar src={collaborator.profile_pic}/>
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
                            {!isLoading && <TextEditor task={task}/>}
                        </TaskDescription>
                        <TaskSidebar>
                            <TaskCollaborators>{!isLoading && renderTaskCollaborators()}</TaskCollaborators>
                            <AddUserToTask><AddUserInput/></AddUserToTask>
                        </TaskSidebar>
                    </TaskInfoBody>
                    <TaskFooter>
                        <img src={priorityIcon}/>

                            <PriorityInput
                                value={priorityInputVal}
                                onChange={(e) => handleInputChange(e)}
                                placeholder={task.priority ?? 1}
                            />

                    </TaskFooter>
                </TaskInfo>
            </OuterDiv>
        , document.querySelector('#modal'))
};

export default BoardColumnTaskInfo;