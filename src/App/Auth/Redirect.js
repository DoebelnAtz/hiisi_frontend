import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios'
import { getUrlParam, } from "../../utils/utils";
class MyComponent extends Component {

    async connect() {
        let code = getUrlParam('code', '');
        console.log(code);
        let resp = await axios({
            method: 'post',
            url: "http://127.0.0.1:8002/api/auth/connect/",
            data: {
                code: code
            },
            headers:{
                'Content-Type': 'application/json'
            }
        });
        localStorage.setItem('resp', JSON.stringify(resp));
        this.props.history.push('/');
    };

    componentDidMount (){
        this.connect();

    }
    render() {
        return (
            <div>

            </div>
        );
    }
}

function mapStateToProps(state) {
    return {};
}

export default connect(
    mapStateToProps,
)(MyComponent);
