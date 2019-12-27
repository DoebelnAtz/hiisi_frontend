import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import './base.css'

class Header extends React.Component {

    requestLogout = () => {
        localStorage.clear();
        this.props.history.push('/login')
    };

    render() {
        return (
            <div className={'row header_nav'}>
                <div id={'header_nav_title'}>{this.props.nav}</div>
                <div id={'header_logout'}
                    onClick={this.requestLogout}
                >Logout</div>
            </div>
        );
    }

}

const mapStateToProps = (state) => {
    return {
        nav: state.nav,
    };
};

export default withRouter(connect(mapStateToProps)(Header))