import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Card from 'react-bootstrap/Card'
import Form from "react-bootstrap/Form";
import Select from 'react-select'
import MyProfilePhoto from "./MyProfilePhoto"; 


import "./profilecard.scss"


export default function ProfileCard ({ user, setUser, userList, isLoading, setIsLoading, categoryList, locationList, token, currUser, setLoadingRequest, loadingRequest }){
    const [profileEditShow, setProfileEditShow] = React.useState(false);
    const [file, setFile] = useState(null);
    const myToken = localStorage.getItem("token");
    let username
    let email
    let password
    let user_type
    let user_location
    let user_charge
    let user_desc

    function handleUpdateProfile (e){
        e.preventDefault();

        const formData = new FormData()
        formData.append('image', file)
        formData.append('user_id', currUser.id)

        fetch('http://localhost:3000/user_photos', {
            method: 'POST',
            headers: {
                // "Content-Type": "application/json",
                Authorization: `Bearer ${myToken}`,
            },
            body: formData
        }).then((r) => {
            if (r.ok){
            //   r.json().then((file) => setFile(file));
            //   setIsLoading(false)
                setLoadingRequest(loadingRequest+1)
                return r.json()
            }
          }).then((data) => console.log(data))

        fetch('http://localhost:3000/user', {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${myToken}`,
            },
            body: JSON.stringify({
                username,
                email,
                password,
                user_type,
                user_location,
                user_charge,
                user_desc 
            })
        }).then((r) => {
            if (r.ok){
            //   r.json().then((file) => setFile(file));
            //   setIsLoading(false)
                setLoadingRequest(loadingRequest+1)
                return r.json()
            }
          }).then((data) => console.log(data))

        setProfileEditShow(false)
    }

    const handlePic = (e) => {
        e.persist()
        console.log("this is the file", e.target.files[0])
        setFile(e.target.files[0]);
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
                        onSubmit={handleUpdateProfile} 
                        // id={listing.id} 
                        >
                        <input 
                            type="file"
                            name='photo' 
                            accept='image/*'
                            onChange={handlePic}
                        />
                        {/* <input type="hidden" name="user_id" value={setUserId(currentUser.id)}/> */}
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
                    <MyProfilePhoto 
                        isLoading={isLoading} 
                        setIsLoading={setIsLoading} 
                        token={token} user={user} 
                        currUser={currUser}
                />
                </div>
                <div className="profile-right">
                    <h5><b>Name: </b>{currUser.username}</h5>
                    <h5><b>Account: </b> {currUser.user_type}</h5>
                    <h5><b>Charge: </b> ${currUser.user_charge}/hr</h5>
                    <h5><b>Location: </b> {currUser.user_location}</h5>
                    <h5><b>Description: </b> {currUser.user_desc}</h5>
                    <div className="image-btn-container">
                        <button 
                            className="edit-profile-btn"
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