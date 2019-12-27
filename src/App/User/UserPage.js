import React, { useEffect, useState } from 'react';
import { makeRequest } from '../Api/Api'
import { useParams } from 'react-router-dom'
import ProfilePage from '../Profile/ProfilePage'


const UserPage = () => {

    const [user, setUser] = useState({});
    let { id } = useParams();

    const getUser = async(id) => {
        let resp = await makeRequest(
            `profiles/${id}`,
            'get',
            {}
        );
        setUser(resp.data);
    };

    useEffect(() => {
        getUser(id)
    }, []);

    return (
        <div>
            <ProfilePage profile={user}/>
        </div>
    );
};

export default UserPage