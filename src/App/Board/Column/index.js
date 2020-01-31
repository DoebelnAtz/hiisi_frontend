import React, {useState} from 'react';
import { Droppable } from 'react-beautiful-dnd'

import { Column, ColumnTitle, ColumnList } from './Styles'
import Task  from './Task'
import Input from "../../Components/Input";

const BoardColumn = ({addTask, columnNum, column, taskList}) => {
    const [inputVal, setInputVal] = useState('');

    console.log(taskList);
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
                        id={task.task_id}
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