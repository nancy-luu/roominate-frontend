import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { RiMailSendLine } from 'react-icons/ri'
const API = 'http://localhost:3000'


export default function ListingPhoto ({ isLoading, setIsLoading, token, singlelisting }){
    
    return(
        <img 
        className="listing-image"
        src={singlelisting.listing_photo.image}
        style={{ width: '10rem', height: '10rem' }}
        ></img>
    )
}