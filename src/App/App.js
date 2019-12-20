import React from "react";
import { BrowserRouter, Route, useHistory } from 'react-router-dom'

import Header from './Header'
import SideNav from './Nav/SideNav'
import Feed from './Feed/Feed'
import Profile from './Profile/Profile'
import './base.css'

class App extends React.Component {
    render () {
        return (
            <BrowserRouter>
                <div id={'main_container'} className={'container'}>
                    <div className={'row'}>
                        <div className={'col-1 col-md-3'}>
                            <SideNav/>
                        </div>
                        <div className={'col-11 col-md-9'}>
                            <Header/>
                            <Route path={'/'} exact component={Feed}/>
                            <Route path={'/profile/'} exact component={Profile}/>
                        </div>
                    </div>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;