import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { RiMailSendLine } from 'react-icons/ri'
import "./mylistingcard.scss"
const API = 'http://localhost:3000'



export default function MyListingPhoto ({ isLoading, setIsLoading, token, listing, currUser, listings }){

    // console.log(listing)
    // console.log(listings[0].listing_photo.id)

    const findMyListingPhoto = listings.filter((l) => {
        if (l.listing_photo.id === listing.listing_photos_id){
            // console.log(l)
            // console.log(l.listing_photo)
            // console.log(l.listing_photo.id)
            return true
        }
    })

    console.log("FIND")
    console.log(findMyListingPhoto)
    // console.log(findMyListingPhoto[0])
    // console.log(findMyListingPhoto[0].listing_photo)
    // console.log(findMyListingPhoto[0].listing_photo.image)



    const foundMyListingPhoto = findMyListingPhoto.map((p) => (
        // console.log(p)
        // console.log(p.listing_photo)
        // console.log(p.listing_photo.image)

        <img 
            className="mylisting-image"
            src={p.listing_photo.image}
            style={{ width: '14rem', height: '10rem' }}
        />
    ))

    // console.log(foundMyListingPhoto)


    return(
        <div className="my=listing-image-container">
            <Row>
                {foundMyListingPhoto}
            </Row>
        </div>
        
    )
}