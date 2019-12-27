import React from 'react'
import { connect } from 'react-redux'
import { Route, withRouter } from 'react-router-dom'
import {Profile, Notification, Coalition, Messages, Home, Logo, ConnectToIntra, Search} from './NavItems'
import { currentNav } from '../../actions/index'
import './nav.css'
import  ProfileOptions from './ProfileOptions/ProfileOptions'

class SideNav extends React.Component{

    constructor(props) {
        super(props);
        this.state = {connected_intra: false, connect_text: 'Connect to Intra'}
    }

    componentDidMount() {
        if (localStorage.getItem('token')) {
            console.log('authenticated');
            if (localStorage.getItem('resp')) {
                let token = JSON.parse(localStorage.getItem('resp'));
                if (token.data.access_token) {
                    this.setState({connected_intra: true, connect_text: 'Connected'})

                }
            }
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
                <Search stuff={this.props}/>
                <ConnectToIntra disabled={this.state.connected_intra} text={this.state.connect_text}/>
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