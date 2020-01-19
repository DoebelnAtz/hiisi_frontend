import Feed from "./Feed/Feed";
import Profile from "./Profile/Profile";
import React, {useRef} from "react";

import { Route, Switch, useLocation } from 'react-router-dom'
import Slots from "./Slots/Slots";
import Search from "./Search/Search";
import UserPage from "./User/UserPage";
import {useTransition, animated} from "react-spring";
import Coalition from "./Coalition/Coalition";
import Notifications from "./Notifications/Notifications";
import MessageHome from "./Messages/MessageHome";
import OpenHive from  './OpenHive/OpenHive'
import Boards from './Boards/Boards'

export default (prop) => {

    const location = useLocation();
    const transitions = useTransition(location, location => location.pathname, {
        from: { display: 'none', opacity: 0, transform: 'translateX(50%)' },
        enter: { display:'block', position: 'relative', opacity: 1, transform: 'translateX(0%)' },
        leave: { display: 'none', position: 'relative', opacity: 0, transform: 'translateX(0%)' },
    });

    //  React-spring useTransition causes a bug where a component is mounted multiple times
    //  TODO: fix this bug..

    const renderCount = useRef(1);

    return (//transitions.map(({ item, props, key }) => (
        <div>
            <Switch location={location}>
                <Route exact path={'/openhive'}
                       render={(props) =>
                           <OpenHive {...props} />
                       }
                />
                <Route exact path={'/boards'}
                       render={(props) =>
                           <Boards {...props} />
                       }
                />
                <Route exact path={'/slots'}
                       render={(props) =>
                           <Slots {...props} />
                       }
                />
                <Route exact path={'/blog'} render={
                    (props) => <Feed renderCount={renderCount}/>
                }/>
                <Route exact path={'/profile/'}
                       render={(props) =>
                           <Profile {...props} />
                       }
                />
                <Route exact path={'/notifications/'}
                       render={(props) =>
                           <Notifications {...props} />
                       }
                />
                <Route exact path={'/message_home/'}
                       render={(props) =>
                           <MessageHome {...props} />
                       }
                />

                <Route exact path={'/coalition/'}
                       render={(props) =>
                           <Coalition {...props} />
                       }
                />
                <Route exact path={'/search'}
                       render={(props) =>
                           <Search {...props} />
                       }
                />

                <Route exact path={'/search/user/:id'}>
                    <UserPage/>
                </Route>
            </Switch>
        </div>
    )

}