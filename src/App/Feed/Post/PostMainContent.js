import React from 'react'

import {formatDate} from "../../../utils/utils";
import CommentButton from "../../Components/Buttons/CommentButton";
import LikeButton from "../../Components/Buttons/LikeButton";

import "./post.css"

const PostMainContent = ({content, expand}) => {
    return (
        <div>
            <div className={'col'}>
                <div className={'row feed_title'}>
                    <span className={'post_title'}>{content.title}</span>
                    <span className={'post_author'}>{content.author}</span>
                    <span className={'post_date'}>{content.date}</span>
                </div>
                <div className={'row post_content'}>
                    <span>{content.content}</span>
                </div>
                <div className={'row noselect'}>
                    <CommentButton expand={expand} comment_count={content.comment_count}/>
                    <LikeButton content={content} />
                </div>
            </div>
        </div>
    )
};

export default PostMainContent
