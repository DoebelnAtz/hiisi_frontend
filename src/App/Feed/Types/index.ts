import {focusList} from "../../../Types";

export interface CommentType {
    c_id: number,
    comment_date: string,
    profile_pic: string,
    username: string,
    commentcontent: string,
    childthread: number
}

export interface CommentProps {
    odd: boolean,
    focusList: focusList,
    child: CommentType,
    renderComments: (odd: boolean, thread: Array<CommentType> | undefined, expanded: boolean) => void,
    isExpanded: boolean
}

export interface PostType {
    b_id: number,
    username: string,
    title: string,
    content: string,
    published_date: string,
    commentthread: number,
    liked: boolean,
    likes: number
}

export interface ReplyProps {
    commentThread: CommentType[] | undefined,
    expandChildThread?: any,
    setCommentThread: any,
    childThreadId: number
}

export type ViewPostProps = {
    commentthread: number,
    focusList: focusList,
}

export type CreatePostModalProps = {
    setPosts: any,
    posts: PostType[] | null | undefined,
    setPopup: any,
    popup: boolean,
    isMounted: any
}

export type PostProps = {
    content: PostType
}