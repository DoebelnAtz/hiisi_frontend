import {FocusList} from "../../../../Types";
import { vote } from '../../Resources/Types';

export interface CommentType {
    c_id: number,
    comment_date: string,
    profile_pic: string,
    username: string,
    u_id: number,
    commentcontent: string,
    childthread: number
}



export interface PostType {
    b_id: number,
    username: string,
    title: string,
    content: string,
    owner: boolean,
    u_id: number,
    published_date: string,
    commentthread: number,
    voted: vote,
    votes: number,
    edited: string,
}


export type PostProps = {
    content: PostType
    deletePost: () => void
}