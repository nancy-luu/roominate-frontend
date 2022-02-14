import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { RiMailSendLine } from 'react-icons/ri'
import Card from 'react-bootstrap/Card'
const API = 'http://localhost:3000'


export default function ListingPhoto ({ isLoading, setIsLoading, token, singlelisting }){
    
    return(
        <Card.Img 
        variant="top" 
        className="listing-image"
        src={singlelisting.listing_photo.image}
        style={{ width: '14rem', height: '10rem' }}
        ></Card.Img>
    )
}