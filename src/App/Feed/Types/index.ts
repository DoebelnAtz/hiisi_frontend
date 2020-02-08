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
    renderComments: (odd: boolean, thread: Array<CommentType>, expanded: boolean) => void,
    isExpanded: boolean
}

export interface PostType {
    blog_id: number,
    username: string,
    title: string,
    commentthread: number,
    liked: boolean,
    likes: number
}

export interface ReplyProps {
    commentThread: Array<CommentType>,
    expandChildThread?: any,
    setCommentThread: any,
    childThreadId: number
}

export interface ViewPostProps {
    commentthread: number,
    focusList: focusList,
}

export interface CreatePostModalProps {
    setPosts: any,
    posts: PostType[],
    setPopup: any,
    popup: boolean,
    isMounted: any
}

export interface PostProps {
    content: PostType
}