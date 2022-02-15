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
        src={singlelisting.listing_photo? singlelisting.listing_photo.image : "https://media.istockphoto.com/vectors/home-icon-flat-vector-illustration-design-vector-id1162202962?k=20&m=1162202962&s=170667a&w=0&h=q9Y9VlP2pgoJOpSdwLLTIS64_cyREBOULeVXf2OtBuU=" }
        style={{ width: '19.9rem', height: '12rem'}}
        ></Card.Img>
    )
}