import React from 'react';
import ProfileCard from '../components/ProfileCard';

const UserPage = props => {
    return (
        <div className = "container">
            <ProfileCard loggedInUsername = {props.loggedInUsername}/>
        </div>
    );
};

export default UserPage;