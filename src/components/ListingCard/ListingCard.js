import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import { RiMailSendLine } from 'react-icons/ri'
import Card from 'react-bootstrap/Card'
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

import "./listingcard.scss"

export default function ListingCard ({ isLoading, setIsLoading }){
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

    return (
        <div className="listing-card-container">
            <Card style={{ width: '20rem', height: '27rem' }}>
                <Card.Img 
                    className="listing-image"
                    variant="top" 
                    src="https://media.istockphoto.com/vectors/home-icon-flat-vector-illustration-design-vector-id1162202962?k=20&m=1162202962&s=170667a&w=0&h=q9Y9VlP2pgoJOpSdwLLTIS64_cyREBOULeVXf2OtBuU=" 
                    style={{ width: '10rem', height: '10rem' }}
                />
                <Card.Body>
                    <Card.Title>Title</Card.Title>
                    <Row>
                        <Card.Text>Category:</Card.Text>
                    </Row>
                    <Row>
                        <Card.Text>Charge:</Card.Text>
                    </Row>
                    <Row>
                        <Card.Text>Location:</Card.Text>
                    </Row>
                    <Row>
                        <Card.Text>Description:</Card.Text>
                    </Row>
                    <button 
                    className="contact-btn"
                    style={{ backgroundColor: "#6C63FF", margin: "1%"}}
                    onClick={() => setMessageModalShow(true)} 
                    ><RiMailSendLine style={{ width: '4rem', height: '2rem' }}/></button>
                </Card.Body>
            </Card>
            <StartConvoModal
                show={messageModalShow}
                onHide={() => setMessageModalShow(false)}
             />
        </div>
    )

}