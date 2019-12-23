import SideNav from "./App";
import Feed from "./Feed/Feed";
import Profile from "./Profile/Profile";
import React from "react";
import Header from './Header'
import { Route } from 'react-router-dom'


export default () => {
    return (
        <div id={'main_container'} className={'container'}>
            <div className={'row'}>
                <div className={'col-1 col-md-3'}>
                    <SideNav/>
                </div>
                <div className={'col-11 col-md-9'}>
                    <Header/>
                    <Route exact path={'/home'} component={Feed}/>
                    <Route exact path={'/profile/'} component={Profile}/>
                </div>
            </div>
        </div>
    )
}