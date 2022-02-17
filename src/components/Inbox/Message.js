import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import "./message.scss"
const API = 'http://localhost:3000'


export default function Message ({ singleMessage, user, userList, isLoading, setIsLoading, loadingRequest, setLoadingRequest }){
    const [showUserProfile, setShowUserProfile] = useState(false)
    const [userPhotos, setUserPhotos] = useState([])
    const token = localStorage.getItem("token");

    useEffect(() => {
        fetch(`${API}/user_photos`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          }, })
        .then((r) => { 
          if (r.ok){
            r.json().then((userPhotos) => setUserPhotos(userPhotos));
          }
        })
    }, []) 

    // console.log(userPhotos)

    // const findMessagePhoto = userPhotos.filter((u) => {
    //     if (u.user_id === singleMessage.user_id){
    //         return true
    //     }
    // })

    // console.log(findMessagePhoto[0].image)

    const findMessageUser = userList.filter((u) => {
        if (u.user_photo.id === singleMessage.user_id){
            return true
        }
    })
    // console.log(findMessageUser)
    // console.log(findMessageUser[0].username)
    // console.log(findMessageUser[0].user_desc)
    // console.log(findMessageUser[0].user_photo.image)
    // console.log(singleMessage)
    // console.log(singleMessage.created_at)




    function ProfileModal(props) {
        return (
            <Modal
                {...props}
                size="m"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Body className="modalbody">
                    <Modal.Title className="profile-name">
                        {findMessageUser[0].username}
                    </Modal.Title>
                    <img
                        className="profile-image"
                        // src={findMessagePhoto[0].image}
                        src={findMessageUser[0].user_photo.image}
                        style={{ width: '25rem' }}
                        onClick={() => setShowUserProfile(true)}
                    /> 
                    <div className="profile-info">
                        <div className="prof-modal-title">Account Type:</div> 
                        <div>{findMessageUser[0].user_type}</div>
                        <div className="prof-modal-title">Charge:</div> 
                        <div>${findMessageUser[0].user_charge}/hr</div>
                        <div className="prof-modal-title">Location:</div> 
                        <div>{findMessageUser[0].user_location}</div>
                        <div className="prof-modal-title">About:</div> 
                        <div>{findMessageUser[0].user_desc}</div>
                    </div> 
                </Modal.Body>
            </Modal>
        );
    }    
    
    return (
        <div className="message-wrapper">
            {singleMessage.user_id === user.id ?
                <div className="my-message-container">
                    <div className="my-message-blob">
                        {singleMessage? singleMessage.message : "No Messages"}
                        <div className="my-message-time">
                            ( {singleMessage.created_at} )
                        </div>
                    </div>
                    <Row className="my-info">
                        <Col className="my-photo">
                            <img
                                className="sender-image"
                                // src={findMessagePhoto[0].image}
                                src={findMessageUser[0].user_photo.image}
                                style={{ width: '7rem' }}
                                onClick={() => setShowUserProfile(true)}
                            />                        
                        </Col>
                    </Row>
                </div>
                :
                <div className="their-message-container">
                    <div className="their-message-blob">
                        {singleMessage? singleMessage.message : "No Messages"}
                        <div className="their-message-time">
                            ( {singleMessage.created_at} )
                        </div>
                    </div>
                    <Row>
                        <Row className="their-info">
                            <Col className="their-photo">
                            <img
                                className="sender-image"
                                // src={findMessagePhoto[0].image}
                                src={findMessageUser[0].user_photo.image}
                                style={{ width: '7rem' }}
                                onClick={() => setShowUserProfile(true)}
                            />
                            </Col>
                        </Row>
                    </Row>
                    <ProfileModal
                        show={showUserProfile}
                        onHide={() => setShowUserProfile(false)}
                    />
                </div>
            }

        </div>
    )

}