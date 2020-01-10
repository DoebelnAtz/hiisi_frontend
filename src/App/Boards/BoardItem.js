import React from 'react'
import {DraggableTask} from "./Task";

import Column from './Column'

export default (props) => {
    const {columns, tasks, moveTask} = props;

    return (
        <div className={props.className}>
            {columns.map((column) => (
                <Column key={column.id} text={column.title} className={'column'}>

                    {column.taskList
                        .map(taskId => tasks.find(task => task.id === taskId))
                        .map((task, index) => (
                            <DraggableTask
                                key={task.id}
                                index={index}
                                isSpace={task.spacer}
                                draggable={true}
                                className={'task'}
                                text={task.text}
                                columnId={column.id}
                                columnIndex={index}
                                id={task.id}
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
