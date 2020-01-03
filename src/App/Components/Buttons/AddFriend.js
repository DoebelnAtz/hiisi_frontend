import React from 'react'
import Button from "./Button";
import {checkFriendList} from "../../../utils/utils";
import {makeRequest} from "../../Api/Api";

const AddFriend = ({target}) => {

    let profile =  JSON.parse(localStorage.getItem("currentUser"));

    const sendFriendRequest = async() => {
        let resp = await makeRequest('send_friend/', 'post', {
            target_id: target.id,
            sender_id: profile.id,
        })
    };

    if (!(target.username === profile.username) && target.username && !checkFriendList(profile, target.username)) {
        return (
            <div>Friends</div>
        );
    }
    else if (!(target.username === profile.username) && target.username && checkFriendList(profile, target.username)) {
        return (
            <Button text={'Add friend'} onClick={sendFriendRequest} />
        );
    }
    else{
        return (
            <div> </div>
        )
    }
};

export default AddFriend