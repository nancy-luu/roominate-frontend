import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { RiMailSendLine } from 'react-icons/ri'
import "./profilephoto.scss"
const API = 'http://localhost:3000'


export default function ProfilePhoto ({ isLoading, setIsLoading, token, singleUser }){

    if (!singleUser.username) {
        return(
            <></>
        )
    }
    return(
            <img 
            className="roominator-image"
            src={singleUser.user_photo ? singleUser.user_photo.image : "https://nanuntio.com/wp-content/uploads/2020/03/service_default_avatar_182956.png"}
            style={{ width: '200px', height: '200px' }}
            ></img>
    )
}