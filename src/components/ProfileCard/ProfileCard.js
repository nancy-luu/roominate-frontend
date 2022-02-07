import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Card from 'react-bootstrap/Card'
import Form from "react-bootstrap/Form";
import Select from 'react-select'

import "./profilecard.scss"


export default function ProfileCard ({ isLoading, setIsLoading, categoryList, locationList }){
    const [profileEditShow, setProfileEditShow] = React.useState(false);
    const [file, setFile] = useState(null);

    const handlePic = (e) => {
        setFile({[e.target.name]: e.target.files[0]});
    }

    function EditProfileModal(props) {
        return (
            <Modal
                {...props}
                size="m"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Edit Profile:
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
                            onChange={handlePic}
                        />
                        {/* <input type="hidden" name="user_id" value={setUserId(currentUser.id)}/> */}
                        <button type='submit' value='Submit'>Submit</button>
                        <div className="form-group">
                            <label>Name*</label>
                            <input 
                                type="listing-title" 
                                className="form-control" 
                                id="listing-title-input" 
                                placeholder="Enter Name..." 
                                // onChange={handleSetActivityName}
                            ></input>
                        </div>
                        <div className="form-group">
                            <label className="listing-category">User Type*</label>
                            <Select  
                                className="basic-multi-select"
                                classNamePrefix="select"
                                options={categoryList} 
                                // value={participants}
                                // onChange={handleOnChange}
                            />
                        </div>
                        <div className="form-group">
                            <label className="listing-location">Location*</label>
                            <Select 
                                className="basic-multi-select"
                                classNamePrefix="select"
                                options={locationList} 
                                // value={participants}
                                // onChange={handleOnChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>Charge*</label>
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
                            <label>About*</label>
                            <input 
                                type="activityDesc" 
                                className="form-control" 
                                id="activityDesc-input" 
                                placeholder="Enter Bio..."
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

    return(
        <div className="profile-container">
            <div className="profile-card">
                <div className="profile-left">
                    <Card.Img 
                        className="profile-image"
                        variant="top" 
                        src="https://nanuntio.com/wp-content/uploads/2020/03/service_default_avatar_182956.png" 
                        style={{ width: '10rem', height: '10rem' }}
                    />
                </div>
                <div className="profile-right">
                    <h5>Name:</h5>
                    <h5>Account:</h5>
                    <h5>Charge:</h5>
                    <h5>Location:</h5>
                    <h5>Description:</h5>
                    <div className="image-btn-container">
                        <button 
                            className="edit-image-btn"
                            variant="primary"
                            style={{ backgroundColor: "#9F99FF", margin: "1%"}}
                            onClick={() => setProfileEditShow(true)} 
                        >edit</button>
                    </div>
                </div>
            </div>
            <EditProfileModal
                show={profileEditShow}
                onHide={() => setProfileEditShow(false)}
            />
        </div>
    )
}