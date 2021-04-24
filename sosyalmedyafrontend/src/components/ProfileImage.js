import React from 'react';
import defaultProfileImage from '../assets/profile-icon.png';
const ProfileImage = (props) => {
    const { user, style, className, newImage } = props;
    //newImage: kullanıcı fotoğraf seçerken geçiçi olarak gösterilecek fotoğraf
    const { username, image } = user;
    let source = defaultProfileImage;
    if (image) {
        source = "/images/"+image;
    }
    return (
        <>
            <img src={newImage || source} className={className} 
            alt={`${username} 
            Profile Photo`} style={style}  
            onError = {event =>{
                event.target.src = defaultProfileImage;
            }}/>
        </>
    );
};

export default ProfileImage;