import React, {useState} from 'react'
import { DragDropContext } from 'react-beautiful-dnd'

import Column from './Column'
import _ from "lodash";

import { Columns } from "./Styles";
import {makeRequest} from "../Api/Api";
import {useRequest} from "../../Hooks/Hooks";

const boardState = {
    columns: [
        {
            column_id: 0,
            column_number: 0,
            title: 'Loading...',
            tasks: [
            ]
        },
        {
            column_id: 1,
            column_number: 1,
            title: 'Loading...',
            tasks: [

            ]
        },
        {
            column_id: 2,
            column_number: 2,
            title: 'Loading...',
            tasks: [

            ]
        },
        {
            column_id: 3,
            column_number: 3,
            title: 'Loading...',
            tasks: [

            ]
        },
        {
            column_id: 4,
            column_number: 4,
            title: 'Loading...',
            tasks: [

            ]
        },
    ],};

const Board = (props) => {

    const [board, setBoard, isLoading] = useRequest(
        'projects/boards/' + props.board_id,
        'get'
    );
    const handleTaskDrop = ({draggableId, destination, source}) => {
        if (!destination)
            return;
        let destColId = Number(destination.droppableId);
        let srcColId = Number(source.droppableId);
        let taskId = Number(draggableId);
        if (srcColId === destColId && source.index === destination.index)
            return;
        let draggedTask = board.columns[srcColId].tasks[source.index];
        let targetCol = board.columns[destColId];
        let updatedTask = {...draggedTask, column_id: targetCol.column_id};
        console.log(draggedTask, targetCol);
        console.log(updatedTask);
        setBoard({columns: board.columns.map(column => ({
                ...column, tasks: _.flow( // check Lodash docs on flow.
                ids => ids.filter(id => id.task_id !== taskId),

                ids =>
                    column.column_number === destColId
                        ? [
                            ...ids.slice(0, destination.index),
                            draggedTask,
                            ...ids.slice(destination.index)]
                        : ids,
                )(column.tasks),
            }))},
        );
        makeRequest('projects/boards/update_task', 'put', updatedTask)
    };

    const addTask = async (taskTitle, taskColumnId) => {
        let resp = await makeRequest('projects/boards/add_task', 'post', {taskTitle, taskColumnId})
        if (resp?.data) {
            let addedTask = resp.data;
            setBoard({...board, columns: board.columns.map(col => {
                console.log(taskColumnId, col);
                if (col.column_id === taskColumnId) {
                    return {...col, tasks: [...col.tasks, addedTask]};
                } else {
                    return col;
                }
            })
            });
        }
    };

    return (
        <DragDropContext onDragEnd={handleTaskDrop}>
            <Columns>
            {(!isLoading ? board : boardState).columns.map((column) => (
                <Column
                    column={column}
                    columnNum={column.column_number}
                    key={column.column_number}
                    taskList={column.tasks}
                    addTask={addTask}
                />
            ))}
            </Columns>
        </DragDropContext>
    )
};

export default Board;