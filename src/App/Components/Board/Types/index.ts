import {User} from "../../../../Types";
import * as H from 'history';

import {BrowserRouterProps} from "react-router-dom";

export interface TaskType {
    task_id: number,
    column_id: number,
    title: string,
    description: string,
    collaborators: User[],
    priority: number,
    owner: boolean,
    color_tag: string | null
    status: string
}

export type ColumnType = {
    column_id: number,
    title: string,
    column_number: number,
    wip_limit: number,
    tasks: TaskType[],
}

export interface BoardType {
    columns: ColumnType[]
}

