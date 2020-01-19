import React, { useContext } from 'react'
import HomeSideView from "./SideViews/HomeSideView";
import MessageSideView from "./SideViews/MessageSideView";
import CurrentNavContext from "../../Context/CurrentNavContext";

export default () => {

    const { currentNav } = useContext(CurrentNavContext);

    const selectNav = (nav) => {
        switch (nav) {
            case ('messages'):
                return (
                    <MessageSideView/>
                );
            default:
                return (
                    <HomeSideView
                    />
                )
        }
    };

    return (
        <div>
            {selectNav(currentNav)}
        </div>
    )
}