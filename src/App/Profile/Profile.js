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
            <div>
                {this.props.profile.username}
                <img id={'profile_profile_pic'} src={this.props.profile.profile_pic}/>
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