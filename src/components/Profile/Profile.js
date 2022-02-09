import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Select from 'react-select'


import MyListingCard from "../MyListingCard/MyListingCard"; 
import ProfileCard from "../ProfileCard/ProfileCard"

import "./profile.scss"


export default function Profile ({ user, setUser, isLoading, setIsLoading, categoryList, locationList}){
    const [listingModalShow, setListingModalShow] = React.useState(false);

    function handleAddListing(){
        console.log("ADD!")
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
        <div className="profile-page">
            <ProfileCard 
                user={user} 
                setUser={setUser} 
                isLoading={isLoading} 
                setIsLoading={setIsLoading} 
                categoryList={categoryList} 
                locationList={locationList}/>
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
                        >add Listing</button>
                    </Col>
                    <MyListingCard 
                        isLoading={isLoading}
                        setIsLoading={setIsLoading} 
                        categoryList={categoryList} 
                        locationList={locationList}
                    />
                </Col>
                <AddListingModal
                    show={listingModalShow}
                    onHide={() => setListingModalShow(false)}
                />
            </div>
        </div>
    )

}