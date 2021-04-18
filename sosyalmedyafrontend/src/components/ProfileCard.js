import React from 'react';
import { useParams } from 'react-router';
//import { Authentication } from '../shared/AuthenticationContext';
import { useSelector } from 'react-redux';

const ProfileCard = props => {

    const routerParams = useParams();

    const { loggedInUsername } = useSelector(store => {
        return { loggedInUsername: store.username };
    });

    const pathUsername = routerParams.username;
    let message = " You cannot edit";

    if (pathUsername === loggedInUsername) {
        message = "You can edit";
    }


    return (
        <div>
            {message}
        </div>
    );
};

export default ProfileCard;