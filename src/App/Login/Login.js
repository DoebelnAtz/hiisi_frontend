import React from 'react'
import { connect } from 'react-redux'

import { requestLogin } from '../../actions/Auth/login'

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {username: '', password: ''}
    }

    requestLogin = async (e) => {
        e.preventDefault();
        await this.props.requestLogin(this.state.username, this.state.password);
        console.log(this.props.login)
    };

    render() {
        return (
            <div className={'container'}>
                <div className={'col'}>
                <form>
                    <div className={'row'}>
                        <input type={'text'}
                               name={'username'}
                               value={this.state.username}
                               onChange={(e) => this.setState({username: e.target.value})}
                        />
                    </div>
                    <div className={'row'}>
                        <input type={'password'}
                               name={'password'}
                               value={this.state.password}
                               onChange={(e) => this.setState({password: e.target.value})}
                        />
                    </div>
                    <div className={'row'}>
                        <button
                            onClick={this.requestLogin}
                        >
                            Login
                        </button>
                    </div>
                </form>
                </div>
            </div>
    );
    }
}

const mapStateToProps = (state) => {
    return {
        nav: state.nav,
        login: state.login
    };
};

export default connect(mapStateToProps, {requestLogin})(Login)