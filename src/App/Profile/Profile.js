import React from 'react'
import connect from "react-redux/es/connect/connect";
import {fetchProfile} from "../../actions/Profile/fetchProfile";
import {currentNav} from "../../actions";

import './profile.css'

class Profile extends React.Component {

    componentDidMount() {
        if (localStorage.getItem('token')) {
            this.props.fetchProfile(JSON.parse(window.localStorage.getItem('token')).id);
            this.props.currentNav('profile');
        }
        else{
            this.props.history.push('login')
        }
    }

    render() {
        console.log(this.props);
        return (
            <div id={'profile_page'} className={'container'}>
                <div className={'row justify-content-center'}>
                    <img id={'profile_profile_pic'} src={this.props.profile.profile_pic}/>
                </div>
                <div className={'row justify-content-center'}>
                        {this.props.profile.username}
                </div>
                <div className={'container'}>
                    <div className={'row'}></div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = (state) => {
    return {
        profile: state.profile,
        nav: state.nav
    };
};

export default connect(mapStateToProps, { fetchProfile, currentNav})(Profile)