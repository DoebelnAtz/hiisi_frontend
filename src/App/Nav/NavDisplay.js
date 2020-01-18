import React, {useState} from 'react'
import HomeSideView from "./SideViews/HomeSideView";
import NavIcons from "./NavIcons";
import MessageSideView from "./SideViews/MessageSideView";

export default (props) => {

    const [display, setDisplay] = useState('home');

    const selectNav = (nav) => {
        switch (nav) {
            case ('messages'):
                return (
                    <MessageSideView
                        threadState={props.threadState}
                        setCurrentNav={props.setCurrentNav}/>
                );
            default:
                return (
                    <HomeSideView
                        setHoveredNav={props.setHoveredNav}
                        hoveredNav={props.hoveredNav}
                        setCurrentNav={props.setCurrentNav}
                        currentNav={props.currentNav}
                    />
                )
        }
    };

    return (
        <div>
            {selectNav(props.currentNav)}
        </div>
    )
}