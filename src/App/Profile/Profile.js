import React from 'react'
import connect from "react-redux/es/connect/connect";
import {fetchProfile} from "../../actions/Profile/fetchProfile";
import {currentNav} from "../../actions";

import './profile.css'

class Profile extends React.Component {

    componentDidMount() {
        this.props.fetchProfile();
        this.props.currentNav('profile');
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