import React, {useState} from "react";
import { Route, Switch, useLocation} from 'react-router-dom'
import { useTransition, animated } from 'react-spring'

import Redirect from './Auth/Redirect'
import Header from './Header'
import UserPage from './User/UserPage'
import SideNav from './Nav/SideNav'
import Feed from './Feed/Feed'
import Search from './Search/Search'
import Slots from './Profile/Slots/Slots'
import Profile from './Profile/Profile'
import Main from './Main'
import Login from './Auth/Login'
import './base.css'

const App =  () => {

    const [currentNav, setCurrentNav] = useState('home');


    return (
        <div>
            <Switch>
                <Route exact path={'/login/'} component={Login}/>
                    <Route exact path={'/redirect/'} component={Redirect}/>
                <Route path={'/'}>
                <div id={'main_container'} className={'container'}>
                    <div className={'row'}>
                        <div className={'col-1 col-md-3'}>
                            <SideNav currentNav={currentNav} setCurrentNav={setCurrentNav}/>
                        </div>
                        <div className={'col-11 col-md-9'}>
                            <Header currentNav={currentNav} setCurrentNav={setCurrentNav}/>
                            <Main setCurrentNav={setCurrentNav}/>
                        </div>
                    </div>
                </div>
                </Route>
            </Switch>
        </div>
    )
};

export default App;