import React, {Component} from 'react';
import {connect} from 'react-redux';

class DatePicker extends Component {
    render() {
        return (
            <div className={'container'}>
                <div className={'row'}>
                    <button>Pick Date</button>
                    <button>Pick Time</button>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {};
}

export default connect(
    mapStateToProps,
)(DatePicker);
