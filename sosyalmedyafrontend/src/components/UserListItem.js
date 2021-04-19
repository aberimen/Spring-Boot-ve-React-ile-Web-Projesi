import React from 'react';
import { Link } from 'react-router-dom';

const UserListItem = (props) => {
    const { user } = props;
    const { username, firstName, lastName, image } = user;
    const defaultImage = "https://www.freeiconspng.com/uploads/profile-icon-9.png";
    return (
        <>
       
            <div className="list-group-item">
                <div className="row">
                    <div className="col-1">
                        <img className="rounded-circle bg-light" src={defaultImage} width="50" height="50" alt="Profile" />
                    </div>
                    <div className="col-11">
                        <div className="font-weight-bold">
                        <Link to = {`user/${username}`}>  {username}  </Link>
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