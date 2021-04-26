import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProfileImage from './ProfileImage';
import { format } from 'timeago.js';
import { useTranslation } from 'react-i18next';

const PostItem = (props) => {

    const { content, user, timestamp } = props.post;
    const { username, firstName, lastName } = user;

    const { i18n } = useTranslation();

    const formattedDate = format(timestamp, i18n.language);


    format
    return (
        <div className="mt-2">
            <div className=" card p-1">
                <div className="d-flex m-3">

                    <ProfileImage className="rounded-circle" style={{ width: "35px", height: "35px" }} user={user} />

                    <div className="flex-fill m-auto">
                        <Link to={`/user/${username}`} className="text-dark" >
                            <h6 className="card-title ml-2" >{`${firstName} ${lastName} `}<small className="text-muted">@{username}</small></h6>
                        </Link>
                    </div>
                </div>
                <div className="card-body">

                    <p className="card-text">
                        {content}
                    </p>
                    <p className="card-text"><small className="text-muted">{formattedDate}</small></p>
                </div>
            </div>
        </div>
    );
};

export default PostItem;