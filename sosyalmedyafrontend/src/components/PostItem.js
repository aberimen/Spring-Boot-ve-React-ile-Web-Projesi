import React from 'react';
import { Link } from 'react-router-dom';
import ProfileImage from './ProfileImage';

const PostItem = (props) => {

    const { content, user } = props.post;
    const { username, firstName, lastName } = user;

    return (
        <div className="mt-2">
            <div className=" card p-1">
                <div className="d-flex m-3">

                    <ProfileImage className="rounded-circle" style={{ width: "35px", height: "35px" }} user={user} />

                    <div className="flex-fill m-auto">
                        <Link to={`/user/${username}`} className="text-dark" >
                            <h6 className="card-title ml-2" >{`${firstName} ${lastName} `}<small class="text-muted">@{username}</small></h6>
                        </Link>
                    </div>
                </div>
                <div className="card-body">

                    <p className="card-text">
                        {content}
                    </p>
                    <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                </div>
            </div>
        </div>
    );
};

export default PostItem;