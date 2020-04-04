import {User} from "../../../../Types";

export interface TaskType {
    task_id: number,
    column_id: number,
    title: string,
    description: string,
    collaborators: User[],
    priority: number,
    owner: boolean,
    color_tag: string | null
    commentthread: number,
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

