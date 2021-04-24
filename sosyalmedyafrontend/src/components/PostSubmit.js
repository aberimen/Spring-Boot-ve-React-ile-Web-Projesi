import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { sendPost } from '../api/apiCall';
import { useApiProgress } from '../api/ApiProgress';
import ButtonWithProgress from './ButtonWithProgress';
import ProfileImage from './ProfileImage';

const PostSubmit = () => {

    const [focused, setFocused] = useState(false); //text area aktifliğini tutan state
    const [post, setPost] = useState("");
    const [validationError, setValidationError] = useState({});

    const pendingApiCall = useApiProgress('post', '/api/posts');

    const user = useSelector((store) => {
        return store;
    });

    const onChange = (event) => {
        setValidationError({});
        setPost(event.target.value);
    };

    const onClickPost = async () => {
        const body = {
            content: post
        };
        try {
            await sendPost(body);
            setFocused(false);
            setPost("");
        } catch (error) {
            if (error.response.data.validationError) {
                setValidationError(error.response.data.validationError);
            }

        }
    };

    let className = "form-control";

    if (validationError.content) {
        className += " is-invalid";
    }

    return (
        <div>
            <div className="card flex-row p-2">

                <ProfileImage user={user} style={{ width: "60px", height: "60px" }} className="rounded-circle border" />

                <div className="p-3 text-right flex-fill">
                    
                    <textarea className={className} rows={focused ? "3" : "1"}
                        onFocus={() => setFocused(true)} onChange={(event) => onChange(event)} value={post} />
                    <div class="invalid-feedback"> {validationError.content}</div>

                    <ButtonWithProgress
                        text="Post"
                        className="btn btn-primary mt-2 "
                        pendingApiCall={pendingApiCall}
                        disabled={post.trim() === "" || pendingApiCall}
                        onClick={onClickPost} />

                </div>
            </div>


        </div>
    );
};

export default PostSubmit;