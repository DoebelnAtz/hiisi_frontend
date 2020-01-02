import React from 'react';
import AddFriend from "../Components/Buttons/AddFriend";

const ProfilePage = ({profile}) => {
    
    return (
        <div id={'profile_page'} className={'container'}>
            <div className={'row justify-content-center'}>
                <img className={'profile_profile_pic'} src={profile.profile_pic} alt={profile.username}/>
            </div>
            <div>
                <p>username: {profile.username}</p>
                <p>achievement points: {profile.points}</p>
                <p>grade: {profile.grade}</p>
                <p>class of: {profile.class_of}</p>
                <p>evaluation points: {profile.correction_points}</p>
                <p>coalition rank: {profile.coalition_rank}</p>
                <p>level: {profile.level}</p>
                <p>location: {profile.location}</p>
                <p>coalition points: {profile.score}</p>
                <p>wallet: {profile.wallet}</p>
                <AddFriend target={profile}/>
            </div>
            <div className={'container'}>
                <div className={'row'}></div>
            </div>
        </div>
    );
};

export default ProfilePage;
