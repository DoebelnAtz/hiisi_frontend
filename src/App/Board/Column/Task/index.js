import React, {Fragment, useState} from 'react'
import { Draggable } from 'react-beautiful-dnd';

import TaskInfo from './TaskInfo'

import {Task, TaskContent, TaskStatus, TaskCollaborators} from './Styles'
import Priority0 from './priorityIcons/Priority0.png'
import Priority1 from './priorityIcons/Priority1.png'
import Priority2 from './priorityIcons/Priority2.png'
import Priority3 from './priorityIcons/Priority3.png'
import Priority4 from './priorityIcons/Priority4.png'



const BoardColumnTask = ({task, index}) => {
    const [showTask, setShowTask] = useState(false);

    const getPriorityIcon = (priority=task.priority) => {
        switch (Number(priority)) {
            case (0):
                return Priority0;
            case (1):
                return Priority1;
            case (2):
                return Priority2;
            case (3):
                return Priority3;
            default:
                return Priority4;
        }
    };

    const renderTaskCollaborators = () => {
        return (
            task.collaborators.map(collaborator => {
                return (<img key={collaborator.u_id} src={collaborator.profile_pic}/>)
            })
        )
    };

    return (
        <Fragment>
            {showTask &&  <TaskInfo task={task} hide={setShowTask} getPriorityIcon={getPriorityIcon}/>}
            <Draggable draggableId={task.task_id.toString()} index={index}>
                {(provided, snapshot) => (
                    <TaskContent
                        ref={provided.innerRef}
                        onClick={() => setShowTask(!showTask)}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        >
                        <Task isBeingDragged={snapshot.isDragging && !snapshot.isDropAnimating}>
                            <span>{task.title}</span>
                            <TaskStatus>
                                <img src={getPriorityIcon()}/>
                                <TaskCollaborators>{renderTaskCollaborators()}</TaskCollaborators>
                            </TaskStatus>
                        </Task>
                    </TaskContent>
                )}
            </Draggable>
        </Fragment>
    )
};

export default BoardColumnTask;