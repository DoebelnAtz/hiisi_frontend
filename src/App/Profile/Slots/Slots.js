import React, {Component} from 'react';
import {connect} from 'react-redux';
import { currentNav } from '../../../actions/index'

import  Datetime  from 'react-datetime'

class Slots extends Component {


    componentDidMount() {
        this.props.currentNav('profile / slots')
    }

    render() {
        return (
            <div>
                <Datetime/>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        nav: state.nav
    };
}

export default connect(
    mapStateToProps, { currentNav }
)(Slots);
