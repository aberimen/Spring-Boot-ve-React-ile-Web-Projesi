import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { sendPost, sendPostAttachment } from '../api/apiCall';
import { useApiProgress } from '../api/ApiProgress';
import ButtonWithProgress from './ButtonWithProgress';
import ProfileImage from './ProfileImage';
import Input from './Input';
import ImageAttachment from './ImageAttachment';

const PostSubmit = () => {

    const [focused, setFocused] = useState(false); //text area aktifliğini tutan state
    const [post, setPost] = useState("");
    const [validationError, setValidationError] = useState({});
    const [newImage, setNewImage] = useState();

    const pendingApiCall = useApiProgress('post', '/api/posts', true);
    const pendingFileUpload = useApiProgress('post', '/api/post-attachments', true);

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
            setValidationError({ ...validationError, image: undefined }); //başka dosya seçildiğinde inputtaki hatayı silmesi
        };
        fileReader.readAsDataURL(file);
    };

    let className = "form-control";

    if (validationError.content) {
        className += " is-invalid";
    }



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
                    <div className="invalid-feedback"> {validationError.content}</div>

                    <Input id="image" type="file" onChange={onChangeFile} />
                    <ImageAttachment image={newImage} pending={pendingFileUpload} />


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