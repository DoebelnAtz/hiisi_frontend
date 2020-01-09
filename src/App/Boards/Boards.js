import React, {useState} from 'react'
import BoardItem from './BoardItem'
import _ from 'lodash'
import { Task } from './Task'

import './boards.css'

const tasklist1 = [{id: 1, text:"Task #1"}, {id: 2, text: "Task #2"}, {id: 3, text: "Task #3"}];
const tasklist2 = [{id: 4, text:"Task #4"}, {id: 5, text: "Task #5"}, {id: 6, text: "Task #6"}, {id: 7, text: "Task #7"}];
const columnList = [{id: 1, title: 'col1', taskList: tasklist1.map(task => task.id)}, {id: 2, title: 'col2', taskList: tasklist2.map(task => task.id)}];

export default (props) => {
    const [columns, setColumns] = useState(columnList);
    const [tasks, setTasks] = useState([...tasklist1, ...tasklist2]);

    const moveTask = (taskId, destColumn, index) => {
        console.log(taskId, destColumn, index);
        setColumns(columns.map(column => ({
            ...column, taskList: _.flow(
                ids => ids.filter(id => id !== taskId),
                ids =>
                    column.id === destColumn
                        ? [...ids.slice(0, index), taskId, ...ids.slice(index)]
                        : ids,

            )(column.taskList)
        })))
    };

    return (
        <div id={"boards_main"}>
            <div className={'board_cont'}>
                <BoardItem moveTask={moveTask} columnList={columns} tasks={tasks} className={'board'}/>
            </div>
        </div>
    )
};