import React, { useContext } from 'react'
import HomeSideView from "./SideViews/HomeSideView";
import MessageSideView from "./SideViews/MessageSideView";
import CurrentNavContext from "../../Context/CurrentNavContext";
import SearchSideView from "./SideViews/SearchSideView";

export default () => {

    const { currentNav } = useContext(CurrentNavContext);

    const selectNav = (nav) => {
        switch (nav) {
            case ('messages'):
                return (
                    <MessageSideView/>
                );
            case ('search'):
                return (
                    <SearchSideView/>
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