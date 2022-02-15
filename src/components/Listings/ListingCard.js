import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import { RiMailSendLine } from 'react-icons/ri'
import Card from 'react-bootstrap/Card'
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import ListingPhoto from "./ListingPhoto"; 


import "./listingcard.scss"


export default function ListingCard ({ isLoading, setIsLoading, user, setUser, listing, setListing, singlelisting, token, userList }){
    const [messageModalShow, setMessageModalShow] = React.useState(false);
    const [showMore, setShowMore] = useState(`${singlelisting.desc.slice(0,50)}...`)
    const [showMoreToggle, setShowMoreToggle] = useState("more")


    function handleShowMore () {
        if (showMoreToggle === "more") {
          setShowMore(`${singlelisting.desc}`)
          setShowMoreToggle("(less)")
        } else {
          setShowMore(`${singlelisting.desc.slice(0,50)}...`)
          setShowMoreToggle("more")
        }
    
    }

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


    const findPoster = userList.filter((pb) => {
        if (pb.id == singlelisting.user_id) {
            return true
        }
    })

    console.log(findPoster)

    const foundPoster = findPoster.map((p) => (
        <Card.Text><b>Posted By: </b> {p.username}</Card.Text>
    ))

    console.log(singlelisting)

    return (
        <div className="listing-card-container">
            <Card style={{width: '20rem', height: '28rem' }}>
                <ListingPhoto
                    className="listing-image-wrapper"
                    isLoading={isLoading} 
                    setIsLoading={setIsLoading} 
                    token={token} 
                    singlelisting={singlelisting}/>
                <Card.Body>
                    <Card.Title className="listing-title"><b>{singlelisting.title}</b></Card.Title>
                    <Row>
                        {foundPoster}
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
            <StartConvoModal
                show={messageModalShow}
                onHide={() => setMessageModalShow(false)}
             />
        </div>
    )
}