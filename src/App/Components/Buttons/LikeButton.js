import React, { useState } from 'react'

import './buttons.css'
import {makeRequest} from "../../Api/Api";
import {checkLikedPosts, getLocal} from "../../../utils/utils";

export default ({content}) => {
    console.log(content);
    const [likes, setLikes] = useState(content.likes);
    let profile = getLocal('currentUser');
    const handleClick = async() => {
        if (!content.liked) {
            let resp = await makeRequest('blogs/like_post', 'post',
                {
                    blogId: content.b_id,
                    userId: profile.u_id
                },
                {
                    "Content-Type": "application/json"
                }
                );
            if (resp.success) {
                content.liked = true;
                setLikes(likes + 1);
            }
        }
    };

    return (
        <div onClick={() => handleClick()} className={'like_button'}>
            <i style={content.liked ?{color: "Red"}:{color: "White"}} className="fas fa-heart"> </i><span style={{color: "var(--logoMain)"}} className={'like_count'}>{likes}</span>
        </div>
    )
}