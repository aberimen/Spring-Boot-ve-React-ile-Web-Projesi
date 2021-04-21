import React from 'react';
import defaultProfileImage from '../assets/profile-icon.png';
const ProfileImage = (props) => {
    const { user, style ,className} = props;
    const { username,image } = user;
    let source = defaultProfileImage;
    if (image) {
        source = image;
    }
    return (
        <>
         <img src={source} className={className} alt={`${username} Profile Photo`} style={style} />
        </>
    );
};

export default ProfileImage;