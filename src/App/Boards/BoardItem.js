import React from 'react'
import {DraggableTask} from "./Task";

import Column from './Column'

export default (props) => {
    const {columns, tasks, moveTask} = props;
    //console.log(columns, tasks);
    return (
        <div className={props.className}>
            {columns.map((column) => (
                <Column key={column.column_id} text={column.title} className={'column'}>

                    {column.taskList
                        .map(taskId => tasks.find(task => {
                            //console.log(task, taskId);
                            return (task.task_id === taskId)
                        }))
                        .map((task, index) => (
                            <DraggableTask
                                key={task.task_id}
                                index={index}
                                isSpace={task.spacer}
                                isEmpty={column.taskList.length === 1}
                                draggable={true}
                                className={'task'}
                                text={task.task_title}
                                columnId={column.column_id}
                                columnIndex={index}
                                id={task.task_id}
                                moveTask={moveTask}
                            />
                        ))
                    }
                </Column>
            ))
            }
        </div>
    )
};
