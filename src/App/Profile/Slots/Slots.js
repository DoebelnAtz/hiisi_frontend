import React, {Component} from 'react';
import {connect} from 'react-redux';
import { currentNav } from '../../../actions/index'
import DatePicker from '../../Components/DatePicker/DatePicker'

class Slots extends Component {

    componentDidMount() {
        this.props.currentNav('profile / slots')
    }

    render() {
        return (
            <div>
                <DatePicker/>
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
