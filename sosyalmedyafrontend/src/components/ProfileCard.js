import React, { useEffect } from 'react';
import { useParams } from 'react-router';
//import { Authentication } from '../shared/AuthenticationContext';
import { useSelector } from 'react-redux';
import ProfileImage from './ProfileImage';

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

    const { user } = props;
    const { username, firstName, lastName } = user;

    return (
        <div>
            <div className="card" style={{ width: "75%" }}>
                <div className="card-header text-center">
                    <ProfileImage className="text-center" style={{ width: "25%" }} user={user} />
                </div>

                <div className="card-body">
                    <h5 className="card-title font-weight-bold">{"@" + username}</h5>
                    <p className="card-text">{firstName + " " + lastName}</p>
                    <a href="#" className="btn btn-primary">Go somewhere</a>
                </div>
            </div>
        </div>
    );
};

export default ProfileCard;