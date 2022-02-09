import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { RiMailSendLine } from 'react-icons/ri'
const API = 'http://localhost:3000'


export default function ListingPhoto ({ isLoading, setIsLoading, token, singlelisting }){
    const [listingPhoto, setListingPhoto] = useState([])    

    useEffect(() => {
        setIsLoading(true)
        fetch(`${API}/listing_photos/${singlelisting.listing_photo.id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((r) => {
          if (r.ok){
            // console.log("listing photos fetched!")
            r.json().then((listingPhoto) => setListingPhoto(listingPhoto));
            setIsLoading(false)
          }
        })
    }, [])

    // console.log(singlelisting.listing_photo.id)

    return(
        <img 
        className="listing-image"
        src={singlelisting.listing_photo}
        style={{ width: '10rem', height: '10rem' }}
        ></img>
    )
}