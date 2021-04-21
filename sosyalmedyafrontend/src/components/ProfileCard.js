import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
//import { Authentication } from '../shared/AuthenticationContext';
import { useSelector } from 'react-redux';
import ProfileImage from './ProfileImage';
import Input from './Input';
const ProfileCard = props => {

    const routerParams = useParams();

    const [inEditMode, setInEditMode] = useState(false);

    const [updatedData, setUpdatedData] = useState();

    const { user } = props;
    const { username, firstName, lastName } = user;

    useEffect(() => {
        if (!inEditMode) {
            setUpdatedData(undefined);
        } else {
            setUpdatedData({firstName,lastName});
        }

    }, [inEditMode]);

    const { loggedInUsername } = useSelector(store => {
        return { loggedInUsername: store.username };
    });

    const pathUsername = routerParams.username;
    let message = " You cannot edit";

    if (pathUsername === loggedInUsername) {
        message = "You can edit";
    }

    const onClickSave = () => {
        //setUpdatedName(event.target.value);
        console.log(updatedData);
    }



    return (
        <div>

            <div className="card" style={{ width: "75%" }}>
                <div className="card-header text-center">
                    <ProfileImage className="text-center" style={{ width: "25%" }} user={user} />
                </div>

                <div className="card-body">
                    <h5 className="card-title font-weight-bold">{"@" + username}</h5>
                    {!inEditMode &&
                        (<><p className="card-text">{firstName + " " + lastName}</p>
                            <button className="btn btn-primary" onClick={() => setInEditMode(true)}>Düzenle</button> </>)
                    }
                    {inEditMode && (
                        <div className="mt-4">
                            <Input label="First Name " defaultValue={firstName} onChange={(event) => setUpdatedData({...updatedData,firstName:event.target.value})} />
                            <Input label="Last Name " defaultValue={lastName} onChange={(event) => setUpdatedData({...updatedData,lastName:event.target.value})} />
                            <button className="btn btn-success" onClick={() => onClickSave()}>Save</button>
                            <button className="btn btn-danger ml-2" onClick={() => setInEditMode(false)}>Cancel</button>
                        </div>
                    )}
                </div>
            </div>



        </div>
    );
};

export default ProfileCard;