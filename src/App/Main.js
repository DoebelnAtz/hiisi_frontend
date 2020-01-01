import Feed from "./Feed/Feed";
import Profile from "./Profile/Profile";
import React, {useRef} from "react";

import { Route, Switch, useLocation } from 'react-router-dom'
import Slots from "./Slots/Slots";
import Search from "./Search/Search";
import UserPage from "./User/UserPage";
import {useTransition, animated} from "react-spring";
import Coalition from "./Coalition/Coalition";
import Messages from "./Messages/Messages";
import Notifications from "./Notifications/Notifications";

export default (prop) => {
    const location = useLocation();
    const transitions = useTransition(location, location => location.pathname, {
        from: { display: 'none', opacity: 0, transform: 'translateX(50%)' },
        enter: { display:'block', position: 'absolute', opacity: 1, transform: 'translateX(0%)' },
        leave: { display: 'none', position: 'absolute', opacity: 0, transform: 'translateX(0%)' },
    });

    const renderCount = useRef(1);

    return transitions.map(({ item, props, key }) => (
        <animated.div key={key} style={props}>
            <Switch location={location}>
                <Route exact path={'/slots'}
                       render={(props) =>
                           <Slots {...props} setCurrentNav={prop.setCurrentNav}/>
                       }

                />
                <Route exact path={'/home'} render={
                    (props) => <Feed renderCount={renderCount}/>
                }/>
                <Route exact path={'/profile/'}
                       render={(props) =>
                           <Profile {...props} setCurrentNav={prop.setCurrentNav}/>
                       }
                />
                <Route exact path={'/notifications/'}
                       render={(props) =>
                           <Notifications {...props} setCurrentNav={prop.setCurrentNav}/>
                       }
                />
                <Route exact path={'/messages/'}
                       render={(props) =>
                           <Messages {...props} setCurrentNav={prop.setCurrentNav}/>
                       }
                />
                <Route exact path={'/coalition/'}
                       render={(props) =>
                           <Coalition {...props} setCurrentNav={prop.setCurrentNav}/>
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