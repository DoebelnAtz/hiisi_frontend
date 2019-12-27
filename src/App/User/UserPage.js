import React, {Component} from 'react';
import axios from 'axios'
import { useParams } from 'react-router-dom'
import connect from "react-redux/es/connect/connect";

import { currentNav } from "../../actions";
import ProfilePage from '../Profile/ProfilePage'

export const GetUserPage = () => {
    let { id } = useParams();
    console.log(id);
    return (<UserPage id={id}/>)
};

class UserPage extends Component {
    constructor(props) {
        super(props);
        this.state = {user: {}}
    }

    async getUser(id) {
        let user = await axios({
            method: 'get',
            url: "http://127.0.0.1:8002/api/profiles/" + id,

        });
        return (user.data);
    }

    async componentDidMount() {

        this.setState(
            {
                user: await this.getUser(this.props.id)
            }
        );

    }

    render() {

        return (
            <div>
                <ProfilePage profile={this.state.user}/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        nav: state.nav
    };
};

export default connect(mapStateToProps, { currentNav })(UserPage)