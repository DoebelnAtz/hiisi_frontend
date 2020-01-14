import React, { useState } from 'react'

import './buttons.css'
import {makeRequest} from "../../Api/Api";
import {checkLikedPosts} from "../../../utils/utils";

export default ({content}) => {

    const [likes, setLikes] = useState(content.likes);
    let profile = JSON.parse(localStorage.getItem('currentUser'));
    const handleClick = async() => {
        if (checkLikedPosts(profile, content)) {
            await makeRequest('like/', 'post',
                {
                    target_id: content.id,
                    change: 1,
                    target: "Blog",
                    user_id: profile.id,
                },
                {
                    "Content-Type": "application/json"
                }
                );
            profile.liked_posts.push({id: content.id});
            localStorage.setItem("currentUser", JSON.stringify(profile));
            setLikes(likes + 1);
        }
    };

    return (
        <div onClick={() => handleClick()} className={'like_button'}>
            <i style={content.liked ?{color: "Red"}:{color: "White"}} className="fas fa-heart"> </i><span style={{color: "var(--logoMain)"}} className={'like_count'}>{likes}</span>
        </div>
    )
}