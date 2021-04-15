import React from 'react';
import { withRouter } from 'react-router';

const ProfileCard = props => {
    const pathUsername = props.match.params.username;
    const loggedInUsername = props.loggedInUsername;
    let message = " You cannot edit";
    if(pathUsername === loggedInUsername){
        message = "You can edit";
    }
    return (
        <div>
            {message}
        </div>
    );
};

export default withRouter(ProfileCard);