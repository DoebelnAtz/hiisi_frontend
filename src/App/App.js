import React from "react";

import Header from './Header'
import SideNav from './Nav/SideNav'
import Feed from './Feed/Feed'
import './base.css'

class App extends React.Component {
    render () {
        return (
            <div>
                <div id={'main_container'} className={'container'}>
                    <div className={'row'}>
                        <div className={'col-1 col-md-3'}>
                            <SideNav/>
                        </div>
                        <div className={'col-11 col-md-9'}>
                            <Header/>
                            <Feed/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;