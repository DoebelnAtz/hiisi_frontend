import React, {useState} from "react";
import { Route, Switch } from 'react-router-dom'

import IntraContext from "./Context/IntraContext";
import UserContext  from './Context/UserContext'
import Redirect from './Auth/Redirect'
import Header from './Header'
import SideNav from './Nav/SideNav'
import Main from './Main'
import Login from './Auth/Login'
import './base.css'
import {makeRequest} from "./Api/Api";



const App =  () => {

    const [currentNav, setCurrentNav] = useState('home');
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("currentUser")));
    const [intra, setIntra] = useState(false);



    return (
        <IntraContext.Provider value={{intra, setIntra}}>
        <UserContext.Provider value={{currentUser, setCurrentUser}}>
            <Switch>
                <Route exact path={'/login/'} component={Login}/>
                    <Route exact path={'/redirect/'} component={Redirect}/>
                <Route path={'/'}>
                <div id={'main_container'} className={'container'}>
                    <div className={'row'}>
                        <div className={'col-1 col-md-3'}>
                            <SideNav currentNav={currentNav} setCurrentNav={setCurrentNav}/>
                        </div>
                        <div id={'main_page'} className={'col-11 col-md-9'}>
                            <Header currentNav={currentNav} setCurrentNav={setCurrentNav}/>
                            <Main setCurrentNav={setCurrentNav}/>
                        </div>
                    </div>
                </div>
                </Route>
            </Switch>
        </UserContext.Provider>
        </IntraContext.Provider>
    )
};

export default App;