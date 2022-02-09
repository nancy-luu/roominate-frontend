import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { RiMailSendLine } from 'react-icons/ri'
const API = 'http://localhost:3000'


export default function ProfilePhoto ({ isLoading, setIsLoading, token, singleUser }){
    const [userPhoto, setUserPhoto] = useState([])    

    useEffect(() => {
        fetch(`${API}/user_photos/${singleUser.user_photo.id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((r) => {
          if (r.ok){
            // console.log("user photos fetched!")
            r.json().then((userPhoto) => setUserPhoto(userPhoto));
          }
        })
    }, [])

    console.log(singleUser.user_photo.image)

    return(
        <img 
        className="roominator-image"
        src={singleUser.user_photo}
        style={{ width: '10rem', height: '10rem' }}
        ></img>
    )
}