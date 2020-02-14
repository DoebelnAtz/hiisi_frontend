import React, { Fragment } from 'react';
import { withRouter } from 'react-router-dom'
import ProfilePage from './ProfilePage'
import { useRequest } from '../../Hooks/index';


const UserPage = ({match}) => {

    const [user, , isLoading] = useRequest(`users/${match.params.uid}`, 'get');

    return (
        <Fragment>
			{!isLoading && <ProfilePage profile={user}/>}
        </Fragment>
    );
};

export default withRouter(UserPage);