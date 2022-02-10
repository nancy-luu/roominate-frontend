import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { RiMailSendLine } from 'react-icons/ri'

const API = 'http://localhost:3000'


export default function MyProfilePhoto ({ isLoading, setIsLoading, token, currUser, profileUser}){
    // const [myPhoto, setMyPhoto] = useState([])   
    
    console.log(currUser)

    // const image = myPhoto ? myPhoto : "not here"
    // console.log(myPhoto)
    
    if (currUser.username)
    {
        return(
            <img 
            className="roominator-image"
            src={currUser.user_photo.image}
            style={{ width: '10rem', height: '10rem' }}
            ></img>
        )
    }
    else{
        return(
            <></>
        )
    }
}