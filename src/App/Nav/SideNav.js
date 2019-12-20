import React from 'react'
import { connect } from 'react-redux'
import { Profile, Notification, Coalition, Messages, Home } from './NavItems'
import { currentNav } from '../../actions/index'
import './nav.css'

class SideNav extends React.Component{

    render() {
        return (
            <div>
                <Home stuff={this.props}/>
                <Profile stuff={this.props}/>
                <Notification stuff={this.props}/>
                <Coalition stuff={this.props}/>
                <Messages stuff={this.props}/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        nav: state.nav,
    };
};

export default connect(mapStateToProps, { currentNav })(SideNav)