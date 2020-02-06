import React, {Fragment, useEffect, useState} from 'react'
import { DragDropContext } from 'react-beautiful-dnd'

import Column from './Column'
import _ from "lodash";

import { Columns, Collaborator, ProjectCollaborators } from "./Styles";
import {makeRequest} from "../Api/Api";
import {useRequest} from "../../Hooks/Hooks";


let boardState = {
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
    ],
};

const Board = (props) => {

    const [board, setBoard, isLoading] = useRequest(
        'projects/boards/' + props.board_id,
        'get'
    );

    const [filteredUser, setFilteredUser] = useState(false);



    const filterBoard = () => {
        let b;
        if (!filteredUser) {
            return board;
        } else {
            b = {...board, columns: board.columns.map(col => {
                    return ({...col, tasks:
                            col.tasks.filter(task =>
                                task.collaborators.find(collaborator =>
                                    collaborator.u_id === filteredUser))
                    })})
            };
            return b;
        }
    };
    const handleTaskDrop = ({draggableId, destination, source}) => {
        if (!destination)
            return;
        let destColId = Number(destination.droppableId);
        let srcColId = Number(source.droppableId);
        let taskId = Number(draggableId);
        if (srcColId === destColId && source.index === destination.index)
            return;
        let draggedTask = filterBoard().columns[srcColId].tasks[source.index];
        let targetCol = filterBoard().columns[destColId];
        let updatedTask = {...draggedTask, column_id: targetCol.column_id};
        draggedTask.column_id = targetCol.column_id;
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
        let resp = await makeRequest('projects/boards/add_task', 'post', {taskTitle, taskColumnId});
        if (resp?.data) {
            let addedTask = resp.data;
            setBoard({...board, columns: board.columns.map(col => {
                if (col.column_id === taskColumnId) {
                    return {...col, tasks: [...col.tasks, addedTask]};
                } else {
                    return col;
                }
            })
            });
        }
    };

    const mapCollaborators = () => {
        if (!isLoading) {
            return (
                props.projectCollaborators.map((collaborator) => {
                    return (
                        <Collaborator
                            filtered={filteredUser===collaborator.u_id}
                            onClick={() => setFilteredUser(filteredUser === collaborator.u_id ? false : collaborator.u_id)}
                            key={collaborator.u_id}>
                            <img
                                key={collaborator.u_id}
                                className={'collaborator_avatar'}
                                src={collaborator.profile_pic}
                            />
                        </Collaborator>
                    );
                })
            )
        } else {
            return(<div style={{marginBottom: '28px'}}>Loading...</div>)
        }
    };

    return (
        <Fragment>
            <ProjectCollaborators>
                {mapCollaborators()}
            </ProjectCollaborators>
            <DragDropContext onDragEnd={handleTaskDrop}>
                <Columns>
                    {(!isLoading ? filterBoard().columns : boardState.columns).map(column => (
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
        </Fragment>
    )
};

export default Board;