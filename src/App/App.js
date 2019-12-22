import React from "react";
import { BrowserRouter, Route, Switch, useHistory } from 'react-router-dom'

import Header from './Header'
import SideNav from './Nav/SideNav'
import Feed from './Feed/Feed'
import Profile from './Profile/Profile'
import Login from './Login/Login'
import './base.css'

class App extends React.Component {
    render () {
        return (
            <BrowserRouter>
                <Route exact path={'/login/'} component={Login}/>

                <div id={'main_container'} className={'container'}>
                    <div className={'row'}>
                        <div className={'col-1 col-md-3'}>
                            <SideNav/>
                        </div>
                        <div className={'col-11 col-md-9'}>
                            <Header/>
                            <Route exact path={'/'} component={Feed}/>
                            <Route exact path={'/profile/'} component={Profile}/>
                        </div>
                    </div>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;