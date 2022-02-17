import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import { RiMailSendLine } from 'react-icons/ri'
import Card from 'react-bootstrap/Card'
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import ListingPhoto from "./ListingPhoto"; 
import Button from 'react-bootstrap/Button';
import "./listingcard.scss"
const API = 'http://localhost:3000'




export default function ListingCard ({ isLoading, setIsLoading, user, currUser, setUser, listing, setListing, singlelisting, token, userList, loadingRequest, setLoadingRequest, setErrors }){
    const [messageModalShow, setMessageModalShow] = React.useState(false);
    const [showMore, setShowMore] = useState(`${singlelisting.desc.slice(0,50)}...`)
    const [showMoreToggle, setShowMoreToggle] = useState("more")
    const [inquiry, setInquiry] = useState("")
    let newHeader


    function handleShowMore () {
        if (showMoreToggle === "more") {
          setShowMore(`${singlelisting.desc}`)
          setShowMoreToggle("(less)")
        } else {
          setShowMore(`${singlelisting.desc.slice(0,50)}...`)
          setShowMoreToggle("more")
        }
    }

    // console.log(listing.user_id)
    // console.log(currUser)

    function handleListInquire(){
        setIsLoading(true)
        fetch(`${API}/conversations`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                header: newHeader,
                user_id: listing.user_id,
                user2_id: currUser.id
            })
        })
        .then((r) => {
            if (r.ok){
                r.json().then((inquiry) => {
                    setInquiry(inquiry)
                    setLoadingRequest(loadingRequest+1)
                })
            } else {
                r.json((err) => setErrors(err));
            }
        })
        setMessageModalShow(false)
    }

    function handleInquiryInput(e){
        e.preventDefault();
        console.log(e.target.value)
        newHeader = e.target.value
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
                        onSubmit={handleListInquire} 
                        id={listing.id} 
                        >
                        <div className="form-group">
                            <label>Header*</label>
                            <input 
                                className="form-control" 
                                placeholder="What listing is this for...?" 
                                onChange={handleInquiryInput}
                            ></input>
                        </div>
                        <div>
                            <Button 
                                className="listing-modal-submit"
                                style={{ backgroundColor: "#6C63FF", margin: "1%"}}
                                type="submit"
                            >{isLoading ? "Loading..." : "Submit"}
                            </Button>
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

    // console.log(findPoster)

    const foundPoster = findPoster.map((p) => (
        <Card.Text key={p.id}><b>Posted By: </b> {p.username}</Card.Text>
    ))

    // console.log(singlelisting)

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