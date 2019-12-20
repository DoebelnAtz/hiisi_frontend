import React from 'react'
import { connect } from 'react-redux'

class Header extends React.Component {

    render() {
        return (
            <div className={'container'}>
                {this.props.nav}
            </div>
        );
    }

}

const mapStateToProps = (state) => {
    return {
        nav: state.nav,
    };
};

export default connect(mapStateToProps)(Header)