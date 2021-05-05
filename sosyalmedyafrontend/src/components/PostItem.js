import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProfileImage from './ProfileImage';
import { format } from 'timeago.js';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { deletePost } from '../api/apiCall';
import Modal from './Modal';
import { useApiProgress } from '../api/ApiProgress';

const PostItem = (props) => {

    const loggedInUser = useSelector(store => store.username);
    const { post, onDeleteSuccess } = props;
    const { content, user, timestamp, fileAttachment, id } = post;
    const { username, firstName, lastName } = user;
    const [visibleModal, setVisibleModal] = useState(false);
    const { i18n } = useTranslation();

    const formattedDate = format(timestamp, i18n.language);

    const ownByUser = username === loggedInUser;

    const pendingApiCall = useApiProgress('delete', '/api/posts/' + id, true);

    const onClickDelete = async () => {
        try {
            await deletePost(id);
            onDeleteSuccess(id);
            setVisibleModal(false);
        } catch (err) {

        }
    };

    const onClickCancel = () => {
        setVisibleModal(false);
    };

    return (
        <>
            <div className="mt-2">
                <div className=" card p-1">
                    <div className="d-flex m-3">
                        <ProfileImage className="rounded-circle" style={{ width: "35px", height: "35px" }} user={user} />
                        <div className="flex-fill m-auto">
                            <Link to={`/user/${username}`} className="text-dark" >
                                <h6 className="card-title ml-2" >{`${firstName} ${lastName} `}<small className="text-muted">@{username}</small></h6>
                            </Link>
                        </div>
                        {ownByUser &&
                            <button className="btn btn-delete-link shadow-none" onClick={() => setVisibleModal(true)}>
                                <span className="material-icons">delete_outline</span>
                            </button>}
                    </div>

                    <div className="card-body">

                        <p className="card-text">
                            {content}
                        </p>
                        {fileAttachment && (<div>
                            {fileAttachment.fileType.startsWith('image') && <img className="w-50" src={"/images/attachments/" + fileAttachment.name} />}
                            {!fileAttachment.fileType.startsWith('image') && <strong> File Attachment</strong>}
                        </div>)}


                        <p className="card-text"><small className="text-muted">{formattedDate}</small></p>
                    </div>
                </div>
            </div>
            <Modal
                okBtnText="Delete Post"
                title="Delete Post"
                visible={visibleModal}
                onClickCancel={onClickCancel}
                onClickOk={onClickDelete}
                message={
                    <div>
                        <strong >Are you sure to delete this post?</strong>
                        <p>{content}</p>
                    </div>}
                pendingApiCall={pendingApiCall}
            />
        </>
    );
};

export default PostItem;