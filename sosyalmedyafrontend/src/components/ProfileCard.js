import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
//import { Authentication } from '../shared/AuthenticationContext';
import { useSelector } from 'react-redux';
import ProfileImage from './ProfileImage';
import Input from './Input';
import { updateUser } from '../api/apiCall';
import ButtonWithProgress from './ButtonWithProgress';
import { useApiProgress } from '../api/ApiProgress';

const ProfileCard = props => {

    const routerParams = useParams();
    const pathUsername = routerParams.username;

    const [inEditMode, setInEditMode] = useState(false);

    const [updatedData, setUpdatedData] = useState({});

    const [user, setUser] = useState({});

    const [editable, setEditable] = useState(false);

    const [newImage, setNewImage] = useState();
    const [validationError, setValidationError] = useState({});

    const { loggedInUsername } = useSelector(store => {
        return { loggedInUsername: store.username };
    });

    useEffect(() => {
        setEditable(pathUsername === loggedInUsername);

    }, [pathUsername, loggedInUsername]);


    useEffect(() => {
        setUser(props.user);

    }, [props.user]);



    const { username, firstName, lastName } = user;


    useEffect(() => {
        if (!inEditMode) {
            setUpdatedData({});
            setNewImage(undefined);
            setValidationError({});
        } else {
            setUpdatedData({ firstName, lastName });
        }

    }, [inEditMode]);


    const onChangeFile = (event) => {
        if (event.target.files.length < 1) {
            return;
        }
        const file = event.target.files[0];
        const fileReader = new FileReader();
        fileReader.onloadend = () => {
            setNewImage(fileReader.result);
        };
        fileReader.readAsDataURL(file);
    };

    const onClickSave = async () => {
        let image;
        if (newImage) {
            image = newImage.split(",")[1];
        }

        const body = {
            ...updatedData, image
        };
        console.log(body);
        try {
            const response = await updateUser(username, body);
            setUser(response.data);
            setInEditMode(false);
        } catch (error) {
            setValidationError(error.response.data.validationError);
        }
    };

    const onChange = event => {
        const { name, value } = event.target;

        setValidationError({ ...validationError, [name]: undefined });
        setUpdatedData({ ...updatedData, [name]: value });

    };

    const pendingApiCall = useApiProgress('put', '/api/users/' + username);
    const { firstName: firstNameErr, lastName: lastNameErr } = validationError;
    return (
        <div>

            <div className="card" style={{ width: "75%" }}>
                <div className="card-header text-center">
                    <ProfileImage className="text-center rounded-circle" style={{ width: "150px", height: "150px" }} user={user} newImage={newImage} />
                </div>

                <div className="card-body">
                    <h5 className="card-title font-weight-bold">{"@" + username}</h5>
                    {!inEditMode &&
                        <>
                            <p className="card-text">{firstName + " " + lastName}</p>
                            {editable && <button className="btn btn-primary" onClick={() => setInEditMode(true)}>Düzenle</button>}
                        </>
                    }
                    {inEditMode && (
                        <div className="mt-4">
                            <input type="file" className="form-control-file mb-3" onChange={event => onChangeFile(event)} />
                            <Input label="First Name " error={firstNameErr} defaultValue={firstName} name="firstName" onChange={(event) => onChange(event)} />
                            <Input label="Last Name " error={lastNameErr} defaultValue={lastName} onChange={(event) => onChange(event)} name="lastName" />
                            <ButtonWithProgress className="btn btn-success" text="Save" disabled={pendingApiCall} onClick={() => onClickSave()} pendingApiCall={pendingApiCall} />
                            <button className="btn btn-danger ml-2" onClick={() => setInEditMode(false)} disabled={pendingApiCall}>Cancel</button>
                        </div>
                    )}
                </div>
            </div>



        </div>
    );
};

export default ProfileCard;