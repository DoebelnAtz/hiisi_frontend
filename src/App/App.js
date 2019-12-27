import React from "react";
import { BrowserRouter, Route, Switch} from 'react-router-dom'
import  { useParams } from 'react-router-dom'

import { GetUserPage } from "./User/UserPage";
import Redirect from './Auth/Redirect'
import Header from './Header'
import UserPage from './User/UserPage'
import SideNav from './Nav/SideNav'
import Feed from './Feed/Feed'
import Search from './Search/Search'
import Slots from './Profile/Slots/Slots'
import Profile from './Profile/Profile'
import Login from './Auth/Login'
import './base.css'

const App =  () => {
        return (
            <BrowserRouter>
                <Switch>
                <Route exact path={'/login/'} component={Login}/>
                    <Route exact path={'/redirect/'} component={Redirect}/>
                <Route path={'/'}>
                <div id={'main_container'} className={'container'}>
                    <div className={'row'}>
                        <div className={'col-1 col-md-3'}>
                            <SideNav/>
                        </div>
                        <div className={'col-11 col-md-9'}>
                            <Header/>
                            <Route exact path={'/profile/slots'} component={Slots}/>
                            <Route exact path={'/home'} component={Feed}/>
                            <Route exact path={'/profile/'} component={Profile}/>
                            <Route exact path={'/search'} component={Search}/>
                            <Route exact path={'/search/user/:id'}>
                                <GetUserPage/>
                            </Route>
                        </div>
                    </div>
                </div>
                </Route>
                </Switch>
            </BrowserRouter>
        );
};

export default App;