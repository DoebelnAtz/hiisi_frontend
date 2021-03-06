import { vote } from '../../Resources/Types';

export interface CommentType {
    c_id: number,
    parentthread: number,
    comment_date: string,
    profile_pic: string | null,
    username: string | null,
    u_id: number | null,
    author: number,
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
    post: PostType
    deletePost: () => void
}