import React, {useState} from 'react';
import { Droppable } from 'react-beautiful-dnd'

import { Column, ColumnTitle, ColumnList } from './Styles'
import Task  from './Task'
import Input from "../../Components/Input";
import {ColumnProps} from "../Types";

const BoardColumn: React.FC<ColumnProps> = ({addTask, columnNum, column, taskList}) => {
    const [inputVal, setInputVal] = useState('');

    return (
        <Droppable key={columnNum} droppableId={columnNum.toString()}>
            {provided => (
                <Column>
                <ColumnTitle>{column.title}</ColumnTitle>
                <Input
                    customStyle={{margin: '10px 0', width: 'calc(100%)'}}
                    placeholder={'add task'}
                    setValueState={setInputVal}
                    valueState={inputVal}
                    onEnter={() => addTask(inputVal, column.column_id)}
                />
                <ColumnList
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                >
                {taskList.map((task, index) => (
                    <Task
                        key={task.task_id}
                        task={task}
                        index={index}
                    />
                ))
                }
                    {provided.placeholder}
                </ColumnList>
                </Column>
            )}
        </Droppable>
    )
};

export default BoardColumn