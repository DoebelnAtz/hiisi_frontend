import React from 'react';
import AddFriend from "../Components/Buttons/AddFriend";

const Filler = (props) => {
    return <div className="filler" style={{ width: `${props.percentage}%` }} />
}

const ProgressBar = (props) => {
    return (
        <div className="progress_bar">
        <Filler percentage={props.percentage} />
        <div className={'level_text'}>Level: {props.whole} - {props.percentage} %</div>
        </div>
    )
}

const ProfileHeader = (props) => {
    const level = {
        whole:Math.floor(props.level), 
        next:Math.floor(props.level) + 1, 
        percentage:Math.round((props.level - Math.floor(props.level)) * 100)
    }

    return (
        <div className={'profile_header'}>
        <img className={'profile_profile_pic'} src={props.profile_pic} alt={props.username}/>
        <h2>{props.username}</h2>
        <p>{props.active ? props.location : 'unavailable'}</p>
        <ProgressBar {...level}/>
    </div>
    )
}

const ProfilePage = ({profile}) => {
    //TODO: add friend button

    return (
        <div id={'profile_page'} className={'container'}>
                <ProfileHeader {...profile}/>
            <div>
                <p>achievement points: {profile.achievement_points}</p>
                <p>grade: {profile.grade}</p>
                <p>class of: {profile.class_of}</p>
                <p>evaluation points: {profile.correction_points}</p>
                <p>coalition rank: {profile.coalition_rank}</p>
                <p>level: {profile.level}</p>
                <p>coalition points: {profile.coalition_points}</p>
                <p>wallet: {profile.wallet}</p>
                <p>active: {profile.active ? 'active' : 'inactive'}</p>
                {/*<AddFriend target={profile}/>*/}
            </div>
            <div className={'container'}>
                <div className={'row'}></div>
            </div>
        </div>
    );
};

export default ProfilePage;
