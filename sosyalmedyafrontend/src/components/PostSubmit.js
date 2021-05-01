import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { sendPost, sendPostAttachment } from '../api/apiCall';
import { useApiProgress } from '../api/ApiProgress';
import ButtonWithProgress from './ButtonWithProgress';
import ProfileImage from './ProfileImage';
import Input from './Input';

const PostSubmit = () => {

    const [focused, setFocused] = useState(false); //text area aktifliğini tutan state
    const [post, setPost] = useState("");
    const [validationError, setValidationError] = useState({});
    const [newImage, setNewImage] = useState();

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

    const onChangeFile = (event) => {
        if (event.target.files.length < 1) {
            return;
        }
        const file = event.target.files[0];
        const fileReader = new FileReader();
        fileReader.onloadend = () => {
            setNewImage(fileReader.result);
            uploadFile(file);
            console.log(file);
            setValidationError({ ...validationError, image: undefined }); //başka dosya seçildiğinde inputtaki hatayı silmesi
        };
        fileReader.readAsDataURL(file);
    };

    let className = "form-control";

    if (validationError.content) {
        className += " is-invalid";
    }

    const onClickCloseImage = () => {
        setNewImage();
        document.getElementById('image').value = null;
    };

    const uploadFile = async (file) => {
        const body = new FormData();
        body.append("file", file);
        await sendPostAttachment(body);
    }

    return (
        <div>
            <div className="card flex-row p-2">

                <ProfileImage user={user} style={{ width: "60px", height: "60px" }} className="rounded-circle border" />

                <div className="p-3 text-right flex-fill">

                    <textarea className={className} rows={focused ? "3" : "1"}
                        onFocus={() => setFocused(true)} onChange={(event) => onChange(event)} value={post} />
                    <div class="invalid-feedback"> {validationError.content}</div>

                    <Input id="image" type="file" onChange={onChangeFile} />
                    <div className="position-relative" style={{ display: newImage ? "block" : "none" }}>
                        <button type="button"
                            className="close position-absolute text-white rounded-circle bg-secondary"
                            style={{ right: "1rem", top: "1rem", width: "2rem", height: "2rem" }}
                            aria-label="Close"
                            onClick={onClickCloseImage}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <img class="img-fluid img-thumbnail" src={newImage} />
                    </div>


                    <ButtonWithProgress
                        text="Post"
                        className="btn btn-primary mt-2 "
                        pendingApiCall={pendingApiCall}
                        disabled={newImage ? pendingApiCall : post.trim() === "" || pendingApiCall}
                        onClick={onClickPost} />

                </div>
            </div>


        </div>
    );
};

export default PostSubmit;