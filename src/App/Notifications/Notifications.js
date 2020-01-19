import React, {useState} from 'react';
import {useFetch, useNav} from "../../Hooks/Hooks";
import Button from "../Components/Buttons/Button";
import {makeRequest} from "../Api/Api";
import _ from 'lodash'

const Notifications = (props) => {

    useNav('notifications', props.setCurrentNav);

    let profile = JSON.parse(localStorage.getItem("currentUser"));

    const [friendRequests, setFriendRequests] = useState(profile.friend_requests);

    const respondRequest = async (target, accept) => {
        await makeRequest('respond_friend/', 'post', {
            target_id: target.id,
            sender_id: profile.id,
            accept: accept
        });
        var prof = profile;
        prof.friend_requests = _.remove(profile.friend_requests, function (request) {
            return (request.username !== target.username);
        });
        if (accept)
            prof.friends = [...prof.friends, target];
        setFriendRequests(prof.friend_requests);
        console.log(friendRequests);
        localStorage.setItem('currentUser', JSON.stringify(prof))
    };

    const renderFriendRequests = (friends) => {
        return (
            friends.map((friend) => {
                return (
                    <div className={'row'} key={friend.id}>
                        <img style={{height: "30px"}} src={friend.profile_pic}/><span className={'friend_request_username'}>{friend.username}</span>
                        <Button onClick={() => respondRequest(friend, true)} id={'accept'} text={"accept"}/>
                        <Button onClick={() => respondRequest(friend, false)} id={"decline"} text={"decline"}/>
                    </div>
                )
            })
        )
    };

    return (
        <div>
            Notifications page
            <div>
                Friend Requests:
                {renderFriendRequests(friendRequests)}
            </div>

        </div>
    )
};

export default Notifications