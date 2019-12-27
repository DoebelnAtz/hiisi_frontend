import React from 'react'
import { connect } from 'react-redux'
import { Route, withRouter } from 'react-router-dom'
import {Profile, Notification, Coalition, Messages, Home, Logo, ConnectToIntra} from './NavItems'
import { currentNav } from '../../actions/index'
import './nav.css'
import  ProfileOptions from './ProfileOptions/ProfileOptions'

class SideNav extends React.Component{

    componentDidMount() {
        if (localStorage.getItem('token')) {
            console.log('authenticated')
        }
        else{
            this.props.history.push('login')
        }
    }

    render() {
        return (
            <div className={'side_nav'}>
                <Logo stuff={this.props}/>
                <Home stuff={this.props}/>
                <Profile stuff={this.props}/>
                <Route exact path={['/profile', '/profile/slots']}>
                    <ProfileOptions stuff={this.props}/>
                </Route>
                <Notification stuff={this.props}/>
                <Coalition stuff={this.props}/>
                <Messages stuff={this.props}/>
                <ConnectToIntra/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        nav: state.nav,
    };
};

export default withRouter(connect(mapStateToProps, { currentNav })(SideNav))