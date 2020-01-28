import React, {useContext, useEffect, useRef, useState} from 'react'
import BoardItem from './BoardItem'
import _ from 'lodash'
import { Task } from './Task'



import './boards.css'
import {makeRequest} from "../Api/Api";
import CurrentNavContext from "../../Context/CurrentNavContext";
import {useNav} from "../../Hooks/Hooks";
import Button from "../Components/Buttons/Button";

const tasklist1 = [{id: 1, text:"Task #1"}, {id: 2, text: "Task #2"}, {id: 3, text: "Task #3"}, {id: 8, text: 'Done', spacer: true}];
const tasklist2 = [{id: 4, text:"Task #4"}, {id: 5, text: "Task #5"}, {id: 6, text: "Task #6"}, {id: 7, text: "Task #7"}, {id: 9, text: 'Done', spacer: true}];
const tasklist3 = [{id: 10, text: 'Done', spacer: true}]; // Bugfix turned into a feature
const tasklist4 = [{id: 10, text: 'Done', spacer: true}];
const tasklist5 = [{id: 10, text: 'Done', spacer: true}];
const columnList = [
    {id: 1, title: 'Backlog', taskList: tasklist1.map(task => task.id)},
    {id: 2, title: 'Breakdown', taskList: tasklist2.map(task => task.id)},
    {id: 3, title: 'In Development', taskList: tasklist3.map(task => task.id)},
    {id: 4, title: 'Testing', taskList: tasklist4.map(task => task.id)},
    {id: 5, title: 'Implementing', taskList: tasklist5.map(task => task.id)}
    ];

export default (props) => {
    const [tasks, setTasks] = useState([]);
    const [columns, setColumns] = useState([]);
    const {setCurrentNav} = useContext(CurrentNavContext);
    const previousHover = useRef(null);

    useNav('Open Hive', setCurrentNav);

    const getTasks = async () => {
        let resp = await makeRequest('projects/boards/' + props.board_id, 'get');
        if (resp?.data) { // TODO: data doesn't really arrive in optimal format, could be improved.
            let t = [];
            resp.data.columns.map(col => {
                t = ([...t, ...col.taskList])
            }); // first get a long array with all the tasks across columns
            setTasks(t);
            setColumns(resp.data.columns.map(col => { // make sure every column has a taskList with ID:s
                return ({...col, taskList: col.taskList.map(task => task.task_id)});
            }));
        }
    };

    useEffect(() => {
        getTasks();
    }, []);

    const addTask = async (destColumn, taskTitle) => {
        let resp = await makeRequest('projects/boards/add_task', 'post', {
            taskTitle: taskTitle,
            taskColumnId: destColumn
        });
        if (resp.data) {
            setTasks([...tasks, resp.data]);// make sure we update tasks before columns
            console.log(resp.data);
               setColumns(columns.map(col => {
                   console.log(columns, col);
                   if (col.column_id === destColumn) {
                       return ({...col, taskList: [resp.data.task_id, ...col.taskList]})
                   } else {
                       return (col);
                   }
               }
               ));
        }
    };

    const moveTask = (taskId, destColumn, index) => {
        console.log(taskId, destColumn, index);
        if(index === previousHover.current)
            console.log(previousHover.current);
        console.log(previousHover.current);
        previousHover.current = index;

        setColumns(columns.map(column => ({
            ...column, taskList: _.flow( // check Lodash docs on flow.
                ids => ids.filter(id => id !== taskId),
                ids =>
                    column.column_id === destColumn
                        ? [...ids.slice(0, index), taskId, ...ids.slice(index)]
                        : ids,
            )(column.taskList),
            })),
        );
    };

    const saveBoardState = async () => {
        const resp = await makeRequest('projects/boards/save_board', 'post', {
            boardState: columns
        });
        if (resp.data) {
           console.log('success')
        }
    };

    return (
        <div id={"boards_main"}>
            <Button customStyle={{marginBottom: 'var(--viewMargin)'}} onClick={() => saveBoardState()}>SAVE</Button>
            <div className={'board_cont'}>
                <BoardItem addTask={addTask} moveTask={moveTask} columns={columns} tasks={tasks} className={'board'}/>
            </div>
        </div>
    )

}