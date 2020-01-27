import React, {useState} from "react";
import { Route, Switch } from 'react-router-dom'
import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { DndProvider } from 'react-dnd'
import Backend from 'react-dnd-html5-backend'
import ErrorContext from '../Context/ErrorContext'
import IntraContext from "../Context/IntraContext";
import CurrentNavContext from '../Context/CurrentNavContext'
import Redirect from './Auth/Redirect'
import Header from './Header'
import SideNav from './Nav/SideNav'
import Main from './Main'
import Login from './Auth/Login'
import './base.css'
import Messages from "./Messages/Messages";
import ServerDown from "./ErrorPages/ServerDown";
import ErrorMessage from "./ErrorPages/ErrorMessage";


const App =  () => {

    const [currentNav, setCurrentNav] = useState('blog');
    const [intra, setIntra] = useState(false);
    const [error, setError] = useState(false);

    return (
        <DndProvider backend={Backend}>
        <MuiPickersUtilsProvider utils={MomentUtils}>
        <IntraContext.Provider value={{intra, setIntra}}>
            <ErrorContext.Provider value={{error, setError}}>
        <CurrentNavContext.Provider value={{currentNav, setCurrentNav}}>
            <Switch>
                <Route exact path={'/505/'} component={ServerDown}/>
                <Route exact path={'/login/'} component={Login}/>
                    <Route exact path={'/redirect/'} component={Redirect}/>
                <Route path={'/'}>
                <div id={'main_container'}>
                    <div id={"main_page_header"} className={'row mx-0'}>
                        <Header currentNav={currentNav} setCurrentNav={setCurrentNav}/>
                    </div>
                    <div id={"main_page"} className={'row m-0'}>
                    <div id={"nav_col"}>
                            <SideNav />
                    </div>
                    <div id={'main_view'}>
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
            </ErrorContext.Provider>
        </IntraContext.Provider>
        </MuiPickersUtilsProvider>
        </DndProvider>
    )
};

export default App;