import React, {Fragment, useState} from 'react'
import { Draggable } from 'react-beautiful-dnd';

import TaskInfo from './TaskInfo'
import Plus from '../../../../Assets/Dots.png'
import {Task, TaskContent, TaskStatus, TaskCollaborators} from './Styles'
import {getPriorityIcon} from "../../../../utils/taskUtils";
import {withRouter} from "react-router-dom";




const BoardColumnTask = ({task, index, history}) => {

    const renderTaskCollaborators = () => {
        return (
            task.collaborators.map((collaborator, index) => {
                if (index === 3 && task.collaborators.length > 4) {
                    return (<img key={collaborator.u_id} src={Plus}/>)
                } else if (index > 3) {
                    return (<div key={collaborator.u_id}/>)
                } else {
                    return (<img key={collaborator.u_id} src={collaborator.profile_pic}/>)
                }
            })
        )
    };

    return (
        <Fragment>
            <Draggable draggableId={task.task_id.toString()} index={index}>
                {(provided, snapshot) => (
                    <TaskContent
                        ref={provided.innerRef}
                        onClick={() => history.push(`${history.location.pathname}/tasks/${task.task_id}`)}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        >
                        <Task isBeingDragged={snapshot.isDragging && !snapshot.isDropAnimating}>
                            <span>{task.title}</span>
                            <TaskStatus>
                                <img src={getPriorityIcon(task.priority)}/>
                                <TaskCollaborators>{renderTaskCollaborators()}</TaskCollaborators>
                            </TaskStatus>
                        </Task>
                    </TaskContent>
                )}
            </Draggable>
        </Fragment>
    )
};

export default withRouter(BoardColumnTask);