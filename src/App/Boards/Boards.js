import React, {useState} from 'react'
import BoardItem from './BoardItem'
import _ from 'lodash'
import { Task } from './Task'



import './boards.css'

const tasklist1 = [{id: 1, text:"Task #1"}, {id: 2, text: "Task #2"}, {id: 3, text: "Task #3"}, {id: 8, text: 'Done', spacer: true}];
const tasklist2 = [{id: 4, text:"Task #4"}, {id: 5, text: "Task #5"}, {id: 6, text: "Task #6"}, {id: 7, text: "Task #7"}, {id: 9, text: 'Done', spacer: true}];
const tasklist3 = [{id: 10, text: 'Done', spacer: true}]; // Bugfix turned into a feature
const columnList = [{id: 1, title: 'Backlog', taskList: tasklist1.map(task => task.id)}, {id: 2, title: 'Breakdown', taskList: tasklist2.map(task => task.id)}, {id: 3, title: 'In Development', taskList: tasklist3.map(task => task.id)}];

class Boards extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            tasks: [...tasklist1, ...tasklist2, ...tasklist3],
            columns: columnList,
        };
    }

    moveTask = (taskId, destColumn, index) => {
        this.setState(state => ({
        columns: state.columns.map(column => ({
            ...column, taskList: _.flowRight(
                ids =>
                    column.id === destColumn
                        ? [...ids.slice(0, index), taskId, ...ids.slice(index)]
                        : ids,
                ids => ids.filter(id => id !== taskId),
            )(column.taskList),
            })),
        }));
    };
    render () {
        return (
            <div id={"boards_main"}>
                <div className={'board_cont'}>
                    <BoardItem moveTask={this.moveTask} columns={this.state.columns} tasks={this.state.tasks} className={'board'}/>
                </div>
            </div>
        )
    }
}

export default Boards