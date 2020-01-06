import React from 'react';
import { Link } from "react-router-dom";
import {useNav} from "../Hooks/Hooks";

import './messages.css'

const MessageHome = (props) => {

    let profile = JSON.parse(localStorage.getItem("currentUser"));

    useNav('message_home', props.setCurrentNav);

    const renderFriends = () => {
        return (
            profile.friends.map((friend) => {
                return (
                    <div onClick={() => props.history.push('messages/'+friend.username)} className={'row message_friend_item'} key={friend.id}>
                        <img className={'avatar_lg mr-2'} src={friend.profile_pic}/><span>{friend.username}</span>
                    </div>
                )
            })
        )
    };
    return (
        <div className={'message_friend_list'}>
            {renderFriends()}
        </div>
    )
};

export default MessageHome