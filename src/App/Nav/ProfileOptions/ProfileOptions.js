import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom'

import { NavSlots } from './ProfileOptionsNav'

class ProfileOptions extends Component {

    render() {
        return (
            <div>
                <NavSlots stuff={this.props.stuff}/>
            </div>
        );
    }
}

function mapStateToProps(state) {

    return {
        nav: state.nav,
    };
}

export default connect(
    mapStateToProps,
)(ProfileOptions);
