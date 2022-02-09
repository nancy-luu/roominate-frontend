import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import { RiMailSendLine } from 'react-icons/ri'
import Card from 'react-bootstrap/Card'
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import ListingPhoto from "../ListingPhoto/ListingPhoto"; 


import "./listingcard.scss"


export default function ListingCard ({ isLoading, setIsLoading, user, setUser, listing, setListing, singlelisting, token }){
    const [messageModalShow, setMessageModalShow] = React.useState(false);


    function StartConvoModal(props) {
        return (
            <Modal
                {...props}
                size="m"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Inquire:
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                    <Form 
                        // onSubmit={handleSubmitMessage} 
                        // id={conversation.id} 
                        >
                        <div className="form-group">
                            <label>Header*</label>
                            <input 
                                className="form-control" 
                                placeholder="What listing is this for...?" 
                                // onChange={handleSetConversationHeader}
                            ></input>
                        </div>
                        <div>
                            <button 
                                className="listing-modal-submit"
                                style={{ backgroundColor: "#9F99FF", margin: "1%"}}
                                type="submit"
                            >{isLoading ? "Loading..." : "Submit"}
                            </button>
                        </div>
                    </Form>
            </Modal.Body>
            </Modal>
        );
    }    

    // console.log(singlelisting.user)
    // console.log(singlelisting.listing_photo)
    // console.log(userList)


    return (
        <div className="listing-card-container">
            <Card style={{width: '20rem', height: '28rem' }}>
                <ListingPhoto 
                    isLoading={isLoading} 
                    setIsLoading={setIsLoading} 
                    token={token} 
                    singlelisting={singlelisting}/>
                <Card.Body>
                    <Card.Title><b>{singlelisting.title}</b></Card.Title>
                    <Row>
                        {/* <Card.Text><b>Post By:</b> {singlelisting.user.username}</Card.Text> */}
                    </Row>
                    <Row>
                        <Card.Text><b>Category:</b> {singlelisting.category}</Card.Text>
                    </Row>
                    <Row>
                        <Card.Text><b>Charge:</b> ${singlelisting.price} /hr</Card.Text>
                    </Row>
                    <Row>
                        <Card.Text><b>Location:</b> {singlelisting.location}</Card.Text>
                    </Row>
                    <Row>
                        <Card.Text><b>Description:</b> {singlelisting.desc} </Card.Text>
                    </Row>
                    <button 
                    className="contact-btn"
                    style={{ backgroundColor: "#6C63FF", margin: "1%"}}
                    onClick={() => setMessageModalShow(true)} 
                    ><RiMailSendLine style={{ width: '3rem', height: '1rem' }}/></button>
                </Card.Body>
            </Card>
            <StartConvoModal
                show={messageModalShow}
                onHide={() => setMessageModalShow(false)}
             />
        </div>
    )

}