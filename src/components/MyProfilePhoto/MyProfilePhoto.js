import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { RiMailSendLine } from 'react-icons/ri'

const API = 'http://localhost:3000'


export default function MyProfilePhoto ({ isLoading, setIsLoading, token, user }){
    const [myPhoto, setMyPhoto] = useState([])    

    // useEffect(() => {
    //     fetch(`${API}/user_photos/${user.user_photo.id}`, {
    //       headers: {
    //         "Content-Type": "application/json",
    //         Authorization: `Bearer ${token}`,
    //       },
    //     })
    //     .then((r) => {
    //       if (r.ok){
    //         // console.log("user photos fetched!")
    //         r.json().then((myPhoto) => setMyPhoto(myPhoto));
    //       }
    //     })
    // }, [])

    console.log(user)

    const image = myPhoto ? myPhoto : "not here"
    console.log(myPhoto)

    return(
        <img 
        className="roominator-image"
        src={image}
        style={{ width: '10rem', height: '10rem' }}
        ></img>
    )
}