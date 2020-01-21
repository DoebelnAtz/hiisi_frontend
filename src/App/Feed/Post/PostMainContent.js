import React, {useState} from 'react'

import {formatDate, getLocal} from "../../../utils/utils";

import "./post.css"
import Button from "../../Components/Buttons/Button";
import {makeRequest} from "../../Api/Api";

const PostMainContent = ({content, expand}) => {

    const [likes, setLikes] = useState(content.likes);
    let profile = getLocal('currentUser');
    const handleClick = async() => {
        if (!content.liked) {
            let resp = await makeRequest('blogs/like_post', 'post',
                {
                    blogId: content.b_id
                },
                {
                    "Content-Type": "application/json"
                }
            );
            if (resp.data.success) {

                content.liked = true;
                setLikes(likes + 1);
            }
        }
    };

    return (
        <div>
            <div className={'post_main_content'}>
                <div className={'row_div feed_title'}>
                    <span className={'post_title'}>{content.title}</span>
                    <span className={'post_author'}>{content.username}</span>
                    <span className={'post_date'}>{formatDate(content.published_date)}</span>
                </div>
                <div className={'row_div post_content'}>
                    <span>{content.content}</span>
                </div>
                <div className={'row_div noselect post_button_row'}>
                    <Button noRadius={true}
                            onClick={() => {expand()}}
                            customStyle={
                                {
                                    borderTop: '0', borderBottom: '0',
                                    borderLeft: '0', borderBottomLeftRadius: '3px'
                                }
                            }
                            >
                        <i className="fas fa-comment-alt"> </i>
                        <span className={'comment_count'}>Comments</span>
                    </Button>
                    <Button
                        onClick={() => handleClick()}
                        noRadius={true}
                        customStyle={
                            {
                                borderTop: '0',
                                borderBottom: '0',
                                borderLeft: '0'
                            }
                        }
                    >

                        <i
                            style={content.liked ?{color: "Red"}:{color: "White"}}
                            className="fas fa-heart">
                        </i>
                        <span
                            style={{color: "var(--logoMain)"}}
                            className={'like_count'}
                        >
                            {likes}
                            </span>
                    </Button>
                </div>
            </div>
        </div>
    )
};

export default PostMainContent
