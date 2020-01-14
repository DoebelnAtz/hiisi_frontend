import React, { useEffect, useState } from 'react';
import { makeRequest } from '../Api/Api'
import { useParams } from 'react-router-dom'
import ProfilePage from '../Profile/ProfilePage'


const UserPage = () => {

    const [user, setUser] = useState({});
    let { id } = useParams();

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
    }, []);

    return (
        <div>
            <ProfilePage profile={user}/>
        </div>
    );
};

export default UserPage