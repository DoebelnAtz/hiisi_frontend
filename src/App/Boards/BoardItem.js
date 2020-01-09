import React, {useCallback, useState} from 'react'
import { useDrop } from 'react-dnd'
import {DraggableTask} from "./Task";
import update from 'immutability-helper'

import Column from './Column'

const style = {
    width: 400,
};
export default (props) => {
    const {columnList, tasks, moveTask} = props;
    return (
        <div className={props.className}>
            {columnList.map((column) => (
                <Column key={column.id} text={column.title}>

                    {column.taskList
                        .map(taskId => tasks.find(task => task.id === taskId))
                        .map((task, index) => (
                            <DraggableTask
                                key={task.id}
                                index={index}
                                className={'task'}
                                text={task.text}
                                columnId={column.id}
                                columnIndex={index}
                                id={task.id}
                                moveTask={moveTask}
                            />
                        ))
                    }
                    {column.taskList.length === 0 && (
                        <DraggableTask
                            isSpace={true}
                            moveTask={task => moveTask(task, column.id, 0)}/>
                    )}
                </Column>
            ))
            }
        </div>
    )
};
