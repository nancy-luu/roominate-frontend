import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import { RiMailSendLine } from 'react-icons/ri';
import Card from 'react-bootstrap/Card'
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import ProfilePhoto from "./ProfilePhoto"; 

import "./roominatorcard.scss"


export default function RoominatorCard({ isLoading, setIsLoading, userList, setUserList, singleUser, token, setErrors }){
    const [messageRoominatorShow, setMessageRoominatorShow] = React.useState(false);


    function StartConvoModal(props) {
        const API = 'http://localhost:3000'
        const [header, setHeader] = useState("")
        const [userId, setUserId] = useState("")
        const [userId2, setUserId2] = useState("")

        function handleStartConversation(e){
            e.preventDefault();
            setIsLoading(true);
            fetch(`${API}/conversation`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  "Accept": "application/json",
                },
                body: JSON.stringify({ 
                      header: header,
                      user_id: userId,
                      user2_id: userId2
                  }),
              })
              .then((r) => {
                setIsLoading(false);
                if (r.ok) {
                  r.json().then((user) => {
                      setHeader("");
                      setUserId("");
                      setUserId2("");
                  });
                } else {
                  r.json().then((err) => setErrors(err));
                }
              });
        }
        
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
                        onSubmit={handleStartConversation} 
                        id={singleUser.id} 
                        >
                        <div className="form-group">
                            <label>Header*</label>
                            <input 
                                className="form-control" 
                                placeholder="What task do you need help with?" 
                                onChange={(e) => setHeader(e.target.value)}
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
            <Card style={{ width: '20rem', height: '30rem' }}>
                <ProfilePhoto 
                    token={token}
                    singleUser={singleUser}
                />
                <Card.Body>
                    <Row>
                        <Card.Title><b>{singleUser.username}</b></Card.Title>
                    </Row>
                    <Row>
                        <Card.Text><b>Account Type: </b>{singleUser.user_type}</Card.Text>
                    </Row>
                    <Row>
                        <Card.Text><b>Charge: </b>${singleUser.user_charge} hr</Card.Text>
                    </Row>
                    <Row>
                        <Card.Text><b>Location: </b>{singleUser.user_location}</Card.Text>
                    </Row>
                    <Row>
                        <Card.Text><b>Description: </b>{singleUser.user_desc}</Card.Text>
                    </Row>
                    <button 
                    className="contact-btn"
                    style={{ backgroundColor: "#6C63FF", margin: "1%"}}
                    onClick={() => setMessageRoominatorShow(true)} 
                    ><RiMailSendLine style={{ width: '3rem', height: '1rem' }}/></button>
                </Card.Body>
            </Card>
            <StartConvoModal
                show={messageRoominatorShow}
                onHide={() => setMessageRoominatorShow(false)}
            />
        </div>

    )

}