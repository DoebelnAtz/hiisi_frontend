import React from 'react';
import { Link } from "react-router-dom";
import {useNav} from "../Hooks/Hooks";

const MessageHome = (props) => {

    let profile = JSON.parse(localStorage.getItem("currentUser"));

    useNav('message_home', props.setCurrentNav);

    const renderFriends = () => {
        return (
            profile.friends.map((friend) => {
                return (
                    <div key={friend.id}>
                        <Link to={'messages/'+friend.username}>{friend.username}</Link>
                    </div>
                )
            })
        )
    };
    return (
        <div>
            {renderFriends()}
        </div>
    )
};

export default MessageHome