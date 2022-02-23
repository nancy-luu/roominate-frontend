import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { RiMailSendLine } from "react-icons/ri";
import "./mylistingcard.scss";
import Card from 'react-bootstrap/Card'

export default function MyListingPhoto({
  isLoading,
  setIsLoading,
  token,
  listing,
  currUser,
  listings,
}) {

  let listingPhotoSrc =
    "https://media.istockphoto.com/vectors/home-icon-flat-vector-illustration-design-vector-id1162202962?k=20&m=1162202962&s=170667a&w=0&h=q9Y9VlP2pgoJOpSdwLLTIS64_cyREBOULeVXf2OtBuU=";

  if (listing.listing_photo?.image) {
    listingPhotoSrc = listing.listing_photo.image;
  }

  return (
      <Card.Img
        variant="top" 
        className="listing-image"
        src={listingPhotoSrc}
        style={{ width: '19.9rem', height: '12rem',}}
      ></Card.Img>
  );
}
