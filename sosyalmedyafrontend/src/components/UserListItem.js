import React from 'react';
import { Link } from 'react-router-dom';
import ProfileImage from './ProfileImage';

const UserListItem = (props) => {
    const { user } = props;
    const { username, firstName, lastName } = user;
    return (
        <>

            <div className="list-group-item">
                <div className="d-flex align-items-center">
                    <div className="mr-2">
                        <ProfileImage className="rounded-circle bg-light" user={user} style={{ width: "50px", height: "50px" }} />
                    </div>
                    <div>
                        <div className="font-weight-bold">
                            <Link to={`user/${username}`}>  {username}  </Link>
                        </div>
                        <div style={{ fontWeight: "400", color: "#777" }}>
                            {`${firstName}  ${lastName}`}
                        </div>
                    </div>
                </div>
            </div>


        </>
    );
};

export default UserListItem;