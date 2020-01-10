import React, {useCallback, useState} from 'react'
import { useDrop } from 'react-dnd'
import {DraggableTask} from "./Task";
import update from 'immutability-helper'

import Column from './Column'

const style = {
    width: 400,
};
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
