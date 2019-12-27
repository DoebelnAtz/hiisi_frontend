import React from 'react';

const ProfilePage = (props) => {
    
    return (
        <div id={'profile_page'} className={'container'}>
            <div className={'row justify-content-center'}>
                <img className={'profile_profile_pic'} src={props.profile.profile_pic} alt={props.profile.username}/>
            </div>
            <div className={'row justify-content-center'}>
                {props.profile.username}
            </div>
            <div className={'container'}>
                <div className={'row'}></div>
            </div>
        </div>
    );
};

export default ProfilePage;
