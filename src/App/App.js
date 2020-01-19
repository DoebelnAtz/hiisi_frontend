import React, {useState} from "react";
import { Route, Switch } from 'react-router-dom'
import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { DndProvider } from 'react-dnd'
import Backend from 'react-dnd-html5-backend'

import IntraContext from "../Context/IntraContext";
import UserContext  from '../Context/UserContext'
import CurrentNavContext from '../Context/CurrentNavContext'
import Redirect from './Auth/Redirect'
import Header from './Header'
import SideNav from './Nav/SideNav'
import Main from './Main'
import Login from './Auth/Login'
import './base.css'
import Messages from "./Messages/Messages";
import ServerDown from "./ErrorPages/ServerDown";

// TODO: some state managment system for currentNav...

const App =  () => {

    const [currentNav, setCurrentNav] = useState('blog');
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("currentUser")));
    const [intra, setIntra] = useState(false);

    return (
        <DndProvider backend={Backend}>
        <MuiPickersUtilsProvider utils={MomentUtils}>
        <IntraContext.Provider value={{intra, setIntra}}>
        <CurrentNavContext.Provider value={{currentNav, setCurrentNav}}>
            <Switch>
                <Route exact path={'/505/'} component={ServerDown}/>
                <Route exact path={'/login/'} component={Login}/>
                    <Route exact path={'/redirect/'} component={Redirect}/>
                <Route path={'/'}>
                <div id={'main_container'} className={'container'}>
                    <div id={"main_page"} className={'row'}>
                        <div id={"nav_col"}>
                                <SideNav />

                        </div>
                        <div id={'main_view'}>
                            <Header currentNav={currentNav} setCurrentNav={setCurrentNav}/>
                            <Main />
                            <Route exact path={'/messages/:tid'} // useTransition in main causes a UI bug
                                   render={(props) =>             // in this component, moved here for now
                                       <Messages {...props} setCurrentNav={setCurrentNav}/>
                                   }
                            />
                        </div>
                    </div>
                </div>
                </Route>
            </Switch>
        </CurrentNavContext.Provider>
        </IntraContext.Provider>
        </MuiPickersUtilsProvider>
        </DndProvider>
    )
};

export default App;