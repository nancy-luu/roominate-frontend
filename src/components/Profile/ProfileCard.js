import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Card from 'react-bootstrap/Card'
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Select from 'react-select'
import MyProfilePhoto from "./MyProfilePhoto"; 


import "./profilecard.scss"


export default function ProfileCard ({ user, setUser, setCurrUser, userList, isLoading, setIsLoading, categoryList, locationList, token, currUser, setLoadingRequest, loadingRequest, userType, showFileName, setShowFileName }){
    const [profileEditShow, setProfileEditShow] = React.useState(false);
    const [file, setFile] = useState(null);
    const [forceUpdate, setForceUpdate] = useState(false);
    const myToken = localStorage.getItem("token");
    let username
    let email
    let password
    let user_type
    let user_location
    let user_charge
    let user_desc

    console.log(currUser.id)

    function handleUpdateProfile (e){
        e.preventDefault();

        const formData = new FormData()
        formData.append('image', file)
        formData.append('user_id', currUser.id)

        fetch(`http://localhost:3000/users/${currUser.id}`, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${myToken}`,
            },
            body: JSON.stringify({
                username,
                user_type,
                user_location,
                user_charge,
                user_desc 
            })
        }).then((r) => {
            if (r.ok){
                return r.json()
            }
          }).then((data) => console.log(data))

          fetch('http://localhost:3000/user_photos', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${myToken}`,
            },
            body: formData
        }).then((r) => {
            if (r.ok){
                return r.json()
            }
          }).then((data) => {
            console.log(data)
        });

        setProfileEditShow(false)
        setLoadingRequest(loadingRequest+1)
    }

    const handlePic = (e) => {
        setShowFileName(e.target.files[0].name)
        setFile(e.target.files[0]);
    }

    function handleUpdateName(e){
        e.preventDefault();
        username = e.target.value
    }

    function handleUpdateType (e) {
        user_type = e.value
    }

    function handleUpdateLocation (e){
        user_location = e.value
    }

    function handleUpdateCharge(e){
        e.preventDefault();
        user_charge = e.target.value
        parseInt(user_charge)
    }

    function handleUpdateDesc(e){
        e.preventDefault();
        user_desc = e.target.value
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
                        >
                        <input 
                            id="img"
                            type="file"
                            name='photo' 
                            accept='image/*'
                            onChange={handlePic}
                            style={{display:"none"}}
                        />
                        <label for="img" className="upload-image-btn">Upload Image</label>
                        <div id="filesname" className="file-name">Chosen file: <b>{showFileName}</b></div>
                        <div className="form-group">
                            <label>Name*</label>
                            <input 
                                type="username" 
                                className="form-control" 
                                id="listing-title-input" 
                                placeholder="Update Name..." 
                                onChange={handleUpdateName}
                            ></input>
                        </div>
                        <div className="form-group">
                            <label className="listing-category">User Type*</label>
                            <Select  
                                type="user_type"
                                className="basic-multi-select"
                                classNamePrefix="select"
                                options={userType} 
                                onChange={handleUpdateType}
                            />
                        </div>
                        <div className="form-group">
                            <label className="listing-location">Location*</label>
                            <Select 
                                type="user_location"
                                className="basic-multi-select"
                                classNamePrefix="select"
                                options={locationList} 
                                onChange={handleUpdateLocation}
                            />
                        </div>
                        <div className="form-group">
                            <label>Charge*</label>
                            <input 
                                type="user_charge" 
                                className="form-control" 
                                id="cost-input" 
                                placeholder="$/hr"
                                autoComplete="on"
                                onChange={handleUpdateCharge}
                            ></input>
                        </div>
                        <div className="form-group">
                            <label>About*</label>
                            <input 
                                type="user_desc" 
                                className="form-control" 
                                id="activityDesc-input" 
                                placeholder="Update Bio..."
                                autoComplete="on"
                                onChange={handleUpdateDesc}
                            ></input>
                        </div>
                        <div>
                            <Button 
                                className="edit-profile-btn"
                                style={{ backgroundColor: "#6C63FF", margin: "1%", border: "0"}}
                                type="submit"
                            >{isLoading ? "Loading..." : "Submit"}
                            </Button>
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
                        setCurrUser={setCurrUser}
                        loadingRequest={loadingRequest}
                />
                </div>
                <div className="profile-right">
                    <h5><b>Name: </b>{currUser.username}</h5>
                    <h5><b>Account: </b> {currUser.user_type}</h5>
                    { currUser.user_type !== 'Home Owner' && 
                        <h5><b>Charge: </b> ${currUser.user_charge}/hr</h5>
                    }
                    <h5><b>Location: </b> {currUser.user_location}</h5>
                    <h5><b>About: </b> {currUser.user_desc}</h5>
                    <div className="image-btn-container">
                        <button 
                            className="edit-profile-btn"
                            variant="primary"
                            style={{ backgroundColor: "#6C63FF", margin: "1%"}}
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