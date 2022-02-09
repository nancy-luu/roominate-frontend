import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { RiMailSendLine } from 'react-icons/ri'
const API = 'http://localhost:3000'


export default function ProfilePhoto ({ isLoading, setIsLoading, token, singleUser }){
  
    return(
        <img 
        className="roominator-image"
        src={singleUser.user_photo.image}
        style={{ width: '10rem', height: '10rem' }}
        ></img>
    )
}