import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import { RiMailSendLine } from 'react-icons/ri'
import Card from 'react-bootstrap/Card'
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

import "./community.scss"

export default function FeaturedUser( ) {
    const [messageModalShow, setMessageModalShow] = React.useState(false);

  return (
    <div className="feat-list-card-container">
            <Card style={{width: '20rem', height: '28rem' }}>
                {/* <ListingPhoto 
                    // isLoading={isLoading} 
                    // setIsLoading={setIsLoading} 
                    // token={token} 
                    // singlelisting={singlelisting}
                /> */}
                <Card.Body>
                    <Card.Title>
                        Title
                        {/* <b>{singlelisting.title}</b> */}
                    </Card.Title>
                    <Row>
                        {/* <Card.Text>Posted By: {postedBy}</Card.Text> */}
                    </Row>
                    <Row>
                        <Card.Text>
                            <b>Category:</b> 
                            {/* {singlelisting.category} */}
                        </Card.Text>
                    </Row>
                    <Row>
                        <Card.Text>
                            <b>Charge:</b> 
                            {/* ${singlelisting.price} /hr */}
                            </Card.Text>
                    </Row>
                    <Row>
                        <Card.Text>
                            <b>Location:</b> 
                            {/* {singlelisting.location} */}
                        </Card.Text>
                    </Row>
                    <Row>
                        <Card.Text>
                            <b>Description:</b> 
                            {/* {singlelisting.desc}  */}
                        </Card.Text>
                    </Row>
                    <button 
                    className="contact-btn"
                    style={{ backgroundColor: "#6C63FF", margin: "1%"}}
                    onClick={() => setMessageModalShow(true)} 
                    ><RiMailSendLine style={{ width: '3rem', height: '1rem' }}/></button>
                </Card.Body>
            </Card>
            {/* <StartConvoModal
                show={messageModalShow}
                onHide={() => setMessageModalShow(false)}
             /> */}
        </div>
    )
}