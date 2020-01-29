import React, {Fragment, useState} from 'react'
import { Draggable } from 'react-beautiful-dnd';

import TaskInfo from './TaskInfo'

import {Task, TaskContent} from './Styles'

const BoardColumnTask = ({task, index}) => {
    const [showTask, setShowTask] = useState(false);
    return (
        <Fragment>
            {showTask &&  <TaskInfo task={task} hide={setShowTask}/>}
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
                        </Task>
                    </TaskContent>
                )}
            </Draggable>
        </Fragment>
    )
};

export default BoardColumnTask;