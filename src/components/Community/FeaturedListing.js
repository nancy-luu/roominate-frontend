import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import { RiMailSendLine } from 'react-icons/ri'
import Card from 'react-bootstrap/Card'
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

import "./community.scss"

export default function FeaturedListing({ featListings, token, singleFeatListing }) {
    const [messageModalShow, setMessageModalShow] = React.useState(false);
    const [showMore, setShowMore] = useState(`${singleFeatListing.desc.slice(0,50)}...`)
    const [showMoreToggle, setShowMoreToggle] = useState("more")

    console.log(singleFeatListing)

    function handleShowMore () {
        if (showMoreToggle === "more") {
          setShowMore(`${singleFeatListing.desc}`)
          setShowMoreToggle("(less)")
        } else {
          setShowMore(`${singleFeatListing.desc.slice(0,50)}...`)
          setShowMoreToggle("more")
        }
    
    }

  return (
    <div className="listing-card-container">
            <Card style={{width: '20rem', height: '28rem' }}>
                <Card.Img 
                    src={singleFeatListing.listing_photo.image}
                    style={{ width: '19.9rem', height: '12rem'}}
                />
                <Card.Body>
                        <Card.Title className="listing-title">
                            <b>{singleFeatListing.title}</b>
                        </Card.Title>
                    <Row>
                        <Card.Text><b>Category:</b> {singleFeatListing.category}</Card.Text>
                    </Row>
                    <Row>
                        <Card.Text><b>Charge:</b> ${singleFeatListing.price} /hr</Card.Text>
                    </Row>
                    <Row>
                        <Card.Text><b>Location:</b> {singleFeatListing.location}</Card.Text>
                    </Row>
                    <Row>
                        <Card.Text><b>Description: </b>
                            {showMore}
                            <b onClick={handleShowMore}>{showMoreToggle}</b>
                        </Card.Text>
                    </Row>
                    <button 
                    className="contact-btn"
                    style={{ backgroundColor: "#6C63FF", margin: "1%"}}
                    onClick={() => setMessageModalShow(true)} 
                    ><RiMailSendLine style={{ width: '3rem', height: '1rem' }}/></button>
                </Card.Body>
            </Card>
        </div>
    )
}