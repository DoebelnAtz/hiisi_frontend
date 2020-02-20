import {User} from "../../../Types";
import * as H from 'history';

import {BrowserRouterProps} from "react-router-dom";

export interface TaskType {
    task_id: number,
    column_id: number,
    title: string,
    description: string,
    collaborators: User[],
    priority: number,
    owner: boolean
}

export interface ColumnType {
    column_id: number,
    title: string,
    column_number: number,
    tasks: Array<TaskType>
}

export interface BoardType {
    columns: Array<ColumnType>
}

