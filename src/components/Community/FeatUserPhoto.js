import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { RiMailSendLine } from 'react-icons/ri'
// import "./featuserphoto.scss"
const API = 'http://localhost:3000'


export default function FeatUserPhoto ({ isLoading, setIsLoading, token, singleFeatUser }){
  
    if (!singleFeatUser.username) {
        return(
            <></>
        )
    }
    return(
        <img 
        className="feat-user-image"
        src={singleFeatUser.user_photo ? singleFeatUser.user_photo.image : "https://nanuntio.com/wp-content/uploads/2020/03/service_default_avatar_182956.png"}
        style={{ width: '20rem', height: '15rem' }}
        ></img>
    )
}