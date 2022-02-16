import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Select from 'react-select'


import MyListingCard from "../MyListingCard/MyListingCard"; 
import ProfileCard from "./ProfileCard"

import "./profile.scss"


export default function Profile ({ user, setUser, userList, isLoading, setIsLoading, categoryList, locationList, currUser, token, loadingRequest, setLoadingRequest, listings, userType }){
    const API = 'http://localhost:3000'
    const [listingModalShow, setListingModalShow] = React.useState(false);
    const [listing, setListing] = useState(null)
    const [errors, setErrors] = useState([]);
    const [file, setFile] = useState(null);
    const myToken = localStorage.getItem("token");
    let title
    let category
    let location
    let price 
    let desc 

    console.log(currUser.id)

    function handleAddListing(e){
        e.preventDefault();
        console.log("added!")

        // console.log("Add Listing")
        e.preventDefault();
        setErrors([]);
        setIsLoading(true);
        fetch(`${API}/listings`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                title,
                category,
                location,
                price,
                desc,
                user_id: currUser.id
            }),
        }).then((r) => {
            r.json().then((listing) => {
                setListing(listing)
                console.log(listing)
                setListingModalShow(false)
                setIsLoading(false);
                const formData = new FormData()
                formData.append('image', file)
                formData.append('listing_id', listing.id)
                fetch(`http://localhost:3000/listing_photos/${listing.id}`, {
                    method: 'POST',
                headers: {
                    Authorization: `Bearer ${myToken}`,
                 },
                body: formData
                }).then((r) => {
            if (r.ok){
                setLoadingRequest(loadingRequest+1)
                return r.json()
            }
            })
            setListingModalShow(false)
        })
    })}

    const handleListPic = (e) => {
        // e.persist()
        console.log("this is the file", e.target.files[0])
        setFile(e.target.files[0]);
    }

    function handleCreateTitle(e){
        e.preventDefault();
        title = e.target.value
    }

    function handleCreateCategory(e){
        category = e.value
    }

    function handleCreateLocation(e){
        location = e.value
    }

    function handleCreatePrice(e){
        e.preventDefault();
        price = e.target.value
    }

    function handleCreateDesc(e){
        e.preventDefault();
        desc = e.target.value
    }

    

    function AddListingModal(props) {
        

        return (
            <Modal
                {...props}
                size="m"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    New Listing Info:
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                    <Form 
                    onSubmit={handleAddListing} 
                    >
                        <input 
                            type="file"
                            name='photo' 
                            onChange={handleListPic}
                        />
                        <div className="form-group">
                            <label>Title*</label>
                            <input 
                                className="form-control" 
                                placeholder="Enter Title..." 
                                onChange={handleCreateTitle}
                            ></input>
                        </div>
                        <div className="form-group">
                            <label className="listing-category">Category*</label>
                            <Select  
                                className="basic-multi-select"
                                options={categoryList} 
                                onChange={handleCreateCategory}
                            />
                        </div>
                        <div className="form-group">
                            <label className="listing-location">Location*</label>
                            <Select 
                                className="basic-multi-select"
                                options={locationList} 
                                onChange={handleCreateLocation}
                            />
                        </div>
                        <div className="form-group">
                            <label>Estimated Cost*</label>
                            <input 
                                type="cost" 
                                className="form-control" 
                                id="cost-input" 
                                placeholder="$ /hr"
                                autoComplete="on"
                                onChange={handleCreatePrice}
                            ></input>
                        </div>
                        <div className="form-group">
                            <label>Description*</label>
                            <input 
                                className="form-control" 
                                placeholder="Enter Description..."
                                autoComplete="on"
                                onChange={handleCreateDesc}
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

    // console.log(userList)
    // console.log(currUser.listing_photo)
    
    if (!currUser.username) {
        return(
            <></>
        )
    }

    return (
        <div className="profile-page">
            <ProfileCard 
                currUser={currUser}
                user={user} 
                setUser={setUser} 
                userList={userList}
                isLoading={isLoading} 
                setIsLoading={setIsLoading} 
                categoryList={categoryList} 
                locationList={locationList}
                loadingRequest={loadingRequest} 
                setLoadingRequest={setLoadingRequest} 
                userType={userType}
                />
            <div className="middle-bar">
                <Col>
                    <Col>
                        <div className="mylistingtitle">my listings:</div>
                    </Col>
                    <Col>
                        <button 
                            className="add-listings-btn"
                            variant="primary"
                            style={{ backgroundColor: "#6C63FF", margin: "1%"}}
                            onClick={() => setListingModalShow(true)} 
                        >add</button>
                    </Col>
                    {currUser.listings.length === 0 ?
                        <Container className="no-listing-wrapper">
                            <img 
                            className="no-inbox-img"
                            src="images/nolistings.png"
                            ></img>
                            <div className="no-listing-text">( you currently have no listings )</div>
                        </Container>
                        :
                        <Container className="my-listings-wrapper">
                            <Row
                                xs={1}
                                md={4}
                                className="g-4"
                                className="d-flex justify-content-center"
                            >
                            {currUser.listings.map((listing) => 
                                <MyListingCard 
                                    isLoading={isLoading}
                                    setIsLoading={setIsLoading} 
                                    categoryList={categoryList} 
                                    locationList={locationList}
                                    listing={listing}
                                    key={listing.id}
                                    token={token}
                                    loadingRequest={loadingRequest} 
                                    setLoadingRequest={setLoadingRequest}
                                    id={listing.id}
                                    currUser={currUser}
                                    listings={listings}
                                />
                            )}
                            </Row>
                        </Container>
                    }
                </Col>
                <AddListingModal
                    show={listingModalShow}
                    onHide={() => setListingModalShow(false)}
                />
            </div>
        </div>
    )
}