import React, { useState } from "react";
import { RiMailSendLine } from 'react-icons/ri';
import Card from 'react-bootstrap/Card'
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

import "./roominatorcard.scss"

export default function RoominatorCard({ isLoading, setIsLoading }){
    const [messageRoominatorShow, setMessageRoominatorShow] = React.useState(false);


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
                                placeholder="What task do you need help with?" 
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
        <div className="roominator-card-container">
            <Card style={{ width: '18rem' }}>
                <Card.Img 
                    className="roominator-image"
                    variant="top" 
                    src="https://nanuntio.com/wp-content/uploads/2020/03/service_default_avatar_182956.png" 
                    style={{ width: '10rem', height: '10rem' }}
                />
                <Card.Body>
                    <Card.Title>USER NAME</Card.Title>
                    <Card.Text>Type</Card.Text>
                    <Card.Text>Charge</Card.Text>
                    <Card.Text>Location</Card.Text>
                    <Card.Text>Description</Card.Text>
                    <button 
                    className="contact-btn"
                    style={{ backgroundColor: "#6C63FF", margin: "1%"}}
                    onClick={() => setMessageRoominatorShow(true)} 
                    ><RiMailSendLine style={{ width: '4rem', height: '2rem' }}/></button>
                </Card.Body>
            </Card>
            <StartConvoModal
                show={messageRoominatorShow}
                onHide={() => setMessageRoominatorShow(false)}
            />
        </div>

    )

}