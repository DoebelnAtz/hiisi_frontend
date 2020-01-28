import React, { useEffect, useState } from 'react';
import { makeRequest } from '../Api/Api'
import {useParams, withRouter} from 'react-router-dom'
import ProfilePage from '../Profile/ProfilePage'


const UserPage = (props) => {

    const [user, setUser] = useState({});
    const id  = props.match.params.uid;

    const getUser = async(id) => {
        let resp = await makeRequest(
            `users/${id}`,
            'get',
            {}
        );
        setUser(resp.data);
    };

    useEffect(() => {
        getUser(id) // eslint-disable-next-line
    }, [props.match.params.uid]);



    return (
        <div>
            <ProfilePage profile={user}/>
        </div>
    );
};

export default withRouter(UserPage);