import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { RiMailSendLine } from 'react-icons/ri'
const API = 'http://localhost:3000'


export default function MyListingPhoto ({ isLoading, setIsLoading, token, listing, currUser }){

    return(
        <img 
        className="my-listing-image"
        src={listing.listing_photo? listing.listing_photo.image : "https://media.istockphoto.com/vectors/home-icon-flat-vector-illustration-design-vector-id1162202962?k=20&m=1162202962&s=170667a&w=0&h=q9Y9VlP2pgoJOpSdwLLTIS64_cyREBOULeVXf2OtBuU="}
        style={{ width: '10rem', height: '10rem' }}
        ></img>
    )
}