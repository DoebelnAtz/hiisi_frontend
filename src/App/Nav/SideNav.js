import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Profile, Notification, Coalition, Messages, Home, Logo } from './NavItems'
import { currentNav } from '../../actions/index'
import './nav.css'

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

export default withRouter(connect(mapStateToProps, { currentNav })(SideNav))