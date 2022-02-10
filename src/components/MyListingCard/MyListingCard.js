import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import {MdOutlineDeleteForever} from 'react-icons/md';
import Card from 'react-bootstrap/Card'
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Select from 'react-select'


import "./mylistingcard.scss"

export default function MyListingCard ({ isLoading, setIsLoading, categoryList, locationList, mySingleListing }){
    const [myListModalShow, setMyListModalShow] = React.useState(false);

    function handleRemove(){
        console.log("DELETE!")
    }

    function EditListingModal(props) {
        return (
            <Modal
                {...props}
                size="m"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Update Listing Info:
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                    <Form 
                        // onSubmit={handleSubmitActivity} 
                        // id={listing.id} 
                        >
                        <input 
                            type="file"
                            name='photo' 
                            accept='image/*'
                            // onChange={handlePic}
                        />
                        {/* <input type="hidden" name="user_id" value={setUserId(currentUser.id)}/> */}
                        <button type='submit' value='Submit'>Submit</button>
                        <div className="form-group">
                            <label>Title*</label>
                            <input 
                                className="form-control" 
                                placeholder="Enter Title..." 
                                // onChange={handleSetActivityName}
                            ></input>
                        </div>
                        <div className="form-group">
                            <label className="listing-category">Category*</label>
                            <Select  
                                className="basic-multi-select"
                                options={categoryList} 
                                // value={participants}
                                // onChange={handleOnChange}
                            />
                        </div>
                        <div className="form-group">
                            <label className="listing-location">Location*</label>
                            <Select 
                                className="basic-multi-select"
                                options={locationList} 
                                // value={participants}
                                // onChange={handleOnChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>Estimated Cost*</label>
                            <h5>$</h5>
                            <input 
                                type="cost" 
                                className="form-control" 
                                id="cost-input" 
                                placeholder="0"
                                autoComplete="on"
                                // onChange={handleSetActivityCost}
                            ></input>
                        </div>
                        <div className="form-group">
                            <label>Description*</label>
                            <input 
                                className="form-control" 
                                placeholder="Enter Description..."
                                autoComplete="on"
                                // onChange={handleSetActivityDesc}
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
        <div className="my-listing-card-wrapper">
            <div className="listing-card-container">
                <Card style={{ width: '20rem', height: '27rem' }}>
                    <Card.Img 
                        className="my-listing-image"
                        variant="top" 
                        src="https://media.istockphoto.com/vectors/home-icon-flat-vector-illustration-design-vector-id1162202962?k=20&m=1162202962&s=170667a&w=0&h=q9Y9VlP2pgoJOpSdwLLTIS64_cyREBOULeVXf2OtBuU=" 
                        style={{ width: '10rem', height: '10rem' }}
                    />
                    <Card.Body>
                        <Card.Title>Title: {mySingleListing.title}</Card.Title>
                        <Row>
                            <Card.Text>Category: {mySingleListing.category}</Card.Text>
                        </Row>
                        <Row>
                            <Card.Text>Charge: {mySingleListing.charge}</Card.Text>
                        </Row>
                        <Row>
                            <Card.Text>Location: {mySingleListing.location}</Card.Text>
                        </Row>
                        <Row>
                            <Card.Text>Description: {mySingleListing.desc}</Card.Text>
                        </Row>
                        <button 
                            className="delete-btn"
                            style={{ backgroundColor: "#6C63FF", margin: "1%"}}
                            onClick={handleRemove}
                        ><MdOutlineDeleteForever style={{ width: '1.5rem', height: '1.5rem' }}/></button>
                        <button 
                            className="mylisting-edit-btn"
                            style={{ backgroundColor: "#6C63FF", margin: "1%"}}
                            onClick={() => setMyListModalShow(true)} 
                        >edit</button>
                    </Card.Body>
                </Card>
            </div>
            <EditListingModal
                show={myListModalShow}
                onHide={() => setMyListModalShow(false)}
            />
        </div>
    )

}