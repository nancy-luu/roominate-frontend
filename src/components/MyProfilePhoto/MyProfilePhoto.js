import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { RiMailSendLine } from 'react-icons/ri'

const API = 'http://localhost:3000'


export default function MyProfilePhoto ({ isLoading, setIsLoading, token, currUser, profileUser}){
    // const [myPhoto, setMyPhoto] = useState([])   
    
    // console.log(currUser)
    // debugger;
    if (!currUser.username){
        return(
            <></>
        )
    }
    return(
        <img 
        className="roominator-image"
        src={currUser.user_photo ? currUser.user_photo.image : "https://nanuntio.com/wp-content/uploads/2020/03/service_default_avatar_182956.png"}
        style={{ width: '15rem', height: '10rem' }}
        ></img>
    )
}