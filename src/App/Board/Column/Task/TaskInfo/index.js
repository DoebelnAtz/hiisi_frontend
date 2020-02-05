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
    AddUserToTask, AddUserInput, AddUser, AddUserBtn
} from "./Styles";

import Plus from '../../../../../Assets/Plus.png'
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
    const [searchResult, setSearchResult] = useState([]);
    const [searchInput, setSearchInput] = useState('');

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

    const assignUserToTask = async (userId, taskId) => {
        let resp = await makeRequest('projects/boards/tasks/add_user', 'post', {userId, taskId});
        if (resp?.data) {
            setTask({...task, collaborators: resp.data.collaborators});
            setSearchInput('');
            setSearchResult([]);
        }
    };

    const handleInputChange = (e) => {
        console.log(e.target.value);
        setPriorityInputVal(e.target.value);
        setTask({...task, priority: e.target.value});
        setPriorityIcon(getPriorityIcon(Number(e.target.value)))
    };

    const handleSearch = async(e) => {
        setSearchInput(e.target.value);
        console.log(e.target.value);
        setSearchResult([]);
        if (e.target.value.length > 0)
        {
            let resp = await makeRequest('users/search', 'post', {search: e.target.value});
            console.log(resp);
            if (resp?.data) {
                setSearchResult(resp.data.filter(user => {
                    for (var i = 0; i < task.collaborators.length; i++) {
                        if (task.collaborators[i].u_id === user.u_id)
                            return false
                    }
                    return true;
                }));
            }
        }
    };

    const renderSearchResults = () => {
        return (
            searchResult.map(user => {
                return (
                    <AddUser onClick={() => assignUserToTask(user.u_id, task.task_id)} key={user.u_id}>
                        <Avatar src={user.profile_pic}/>
                        <span>{user.username}</span>
                        <AddUserBtn>+</AddUserBtn>
                    </AddUser>
                )
            })
        )
    };

    const renderTaskCollaborators = () => {
        return (
            task.collaborators.map((collaborator, index)=> {
                if (index === 3 && task.collaborators.length > 4) {
                    return <Collaborator key={collaborator.u_id} src={Plus}/>
                } else if (index > 3) {
                    return (<div/>)
                } else {
                    return (
                        <Collaborator key={collaborator.u_id} src={collaborator.profile_pic}/>
                    )
                }
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
                            <AddUserToTask>
                                <AddUserInput style={{width: '100%'}} value={searchInput} onChange={(e) => handleSearch(e)}/>
                            </AddUserToTask>
                            {!!searchResult.length && renderSearchResults()}
                        </TaskSidebar>
                    </TaskInfoBody>
                    <TaskFooter>
                        <img src={priorityIcon}/>

                            <PriorityInput style={{width: '14px'}}
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