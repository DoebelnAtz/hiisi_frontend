import {FocusList} from "../../../Types";
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

export interface CommentProps {
    odd: boolean,
    focusList: FocusList,
    child: CommentType,
    renderComments: (odd: boolean, thread: Array<CommentType> | undefined, expanded: boolean) => void,
    isExpanded: boolean
}

export interface PostType {
    b_id: number,
    username: string,
    title: string,
    content: string,
    owner: boolean,
    published_date: string,
    commentthread: number,
    voted: vote,
    votes: number
}

export interface ReplyProps {
    commentThread: CommentType[] | undefined,
    expandChildThread?: any,
    setCommentThread: any,
    childThreadId: number
}

export type ViewPostProps = {
    commentthread: number,
    focusList: FocusList,
}

export type CreatePostModalProps = {
    setPopup: any,
    popup: boolean,
    isMounted: any
}

export type PostProps = {
    content: PostType
    deletePost: () => void
}