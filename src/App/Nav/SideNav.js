import React from 'react'
import { connect } from 'react-redux'
import { Profile, Notification, Coalition, Messages } from './NavItems'
import { currentNav } from '../../actions/index'
import './nav.css'

class SideNav extends React.Component{

    render() {
        console.log(this.props);
        return (
            <div>
                <Profile stuff={this.props}/>
                <Notification/>
                <Coalition/>
                <Messages/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        nav: state.nav,
    };
};

export default connect(mapStateToProps, currentNav)(SideNav)