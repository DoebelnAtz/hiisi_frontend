import Feed from "./Feed/Feed";
import Profile from "./Profile/Profile";
import React from "react";

import { Route, Switch, useLocation } from 'react-router-dom'
import Slots from "./Profile/Slots/Slots";
import Search from "./Search/Search";
import UserPage from "./User/UserPage";
import {useTransition, animated} from "react-spring";


export default (prop) => {
    const location = useLocation();
    const transitions = useTransition(location, location => location.pathname, {
        from: { display: 'none', opacity: 0, transform: 'translateX(50%)' },
        enter: { display:'block', position: 'absolute', opacity: 1, transform: 'translateX(0%)' },
        leave: { display: 'none', position: 'absolute', opacity: 0, transform: 'translateX(0%)' },
    });

    return transitions.map(({ item, props, key }) => (
        <animated.div key={key} style={props}>
            <Switch location={location}>
                <Route exact path={'/profile/slots'} component={Slots}/>
                <Route exact path={'/home'} component={Feed}/>
                <Route exact path={'/profile/'}
                       render={(props) =>
                           <Profile {...props} setCurrentNav={prop.setCurrentNav}/>
                       }
                />
                <Route exact path={'/search'}
                render={(props) =>
                <Search {...props} setCurrentNav={prop.setCurrentNav}/>
                }
                />
                <Route exact path={'/search/user/:id'}>
                    <UserPage/>
                </Route>
            </Switch>
        </animated.div>
    ))
}