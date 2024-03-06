import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { RiMailSendLine } from 'react-icons/ri'
import "./myprofilephoto.scss"

const API = 'http://localhost:3000'

export default function MyProfilePhoto ({ isLoading, setIsLoading, token, currUser, profileUser, loadingRequest }) {
    const [userPhoto, setUserPhoto] = useState(currUser.user_photo ? currUser.user_photo.image : "https://nanuntio.com/wp-content/uploads/2020/03/service_default_avatar_182956.png");

    useEffect(() => {
        if (currUser.user_photo) {
            setUserPhoto(currUser.user_photo.image);
        }
    }, [currUser, loadingRequest]);

    if (!currUser.username){
        return <></>;
    }

    return (
        <img 
            className="myprofile-image"
            src={userPhoto}
            style={{ width: '20rem', height: '17rem' }}
            alt="profile"
        />
    );
}
