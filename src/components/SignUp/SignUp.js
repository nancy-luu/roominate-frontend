import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Select from 'react-select'


export default function SignUp({ onLogin, setLoadingRequest, loadingRequest, categoryList, userType, locationList }) {
    const API = 'http://localhost:3000'
    const [modalShow, setModalShow] = React.useState(false);
    const [errors, setErrors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    let username
    let email
    let password
    let user_type
    let user_location
    let user_charge
    let user_desc

  
    function handleSubmit(e) {
        e.preventDefault();
        setErrors([]);
        setIsLoading(true);
        fetch(`${API}/signup`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
          },
          body: JSON.stringify({
            username,
            email,
            password,
            user_type,
            user_location,
            user_charge,
            user_desc
          }),
        }).then((r) => {
          setIsLoading(false);
          if (r.ok) {
            r.json().then((user) => {
                localStorage.setItem("token", user.token);
                onLogin(user);
                setLoadingRequest(loadingRequest+1)
            })
          } else {
            r.json().then((err) => {
                console.log(err.errors)
                setErrors(err.errors);
            })
        }});
    }

    function handleSetName(e){
        e.preventDefault();
        username = e.target.value
    }

    function handleSetEmail(e){
        e.preventDefault();
        email = e.target.value
    }

    function handleSetPassword(e){
        e.preventDefault();
        password = e.target.value
    }

    function handleSetAccountType(e){
        e.preventDefault();
        user_type = e.target.value
    }

    function handleSetAccountLocation(e){
        e.preventDefault();
        user_location = e.target.value
    }

    function handleSetAbout(e){
        e.preventDefault();
        user_desc = e.target.value
    }

    function handleSetCharge(e){
        e.preventDefault();
        user_charge = e.target.value
    }

    function MyVerticallyCenteredModal(props) {
        return (
            <Modal
                {...props}
                size="m"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                Welcome!
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>User Name*</label>
                            <input 
                                type="username" 
                                className="form-control" 
                                id="username-input" 
                                placeholder="Enter User Name" 
                                onChange={handleSetName}
                                autoComplete="off"
                            ></input>
                        </div>
                        <div className="form-group">
                            <label>Email*</label>
                            <input 
                                type="email" 
                                className="form-control" 
                                id="email-input" 
                                placeholder="Enter Email"
                                onChange={handleSetEmail}
                            ></input>
                        </div>
                        <div className="form-group">
                            <label>Password*</label>
                            <input 
                                type="password" 
                                className="form-control" 
                                id="password-input" 
                                placeholder="Password"
                                autoComplete="on"
                                onChange={handleSetPassword}
                            ></input>
                        </div>
                        <Modal.Title id="contained-modal-title-vcenter">
                        register your info:
                        </Modal.Title>
                        <label>Account Type*</label>
                        <Select 
                            value={user_type}
                            options={userType} 
                            onSelect={handleSetAccountType}
                        ></Select>
                        <label>Charge*</label>
                            <input 
                                className="form-control" 
                                placeholder="per hour?"
                                autoComplete="on"
                                value={user_charge}
                                onChange={handleSetCharge}
                            ></input>
                         <label>Location*</label>
                        <Select 
                            value={user_location}
                            options={locationList} 
                            onSelect={handleSetAccountLocation}
                        ></Select>
                        <div className="form-group">
                            <label>About*</label>
                            <input 
                                className="form-control" 
                                id="password-input" 
                                placeholder="Tell us about yourself.."
                                autoComplete="on"
                                onChange={handleSetAbout}
                            ></input>
                        </div>
                        <div>
                            <Button 
                                style={{ backgroundColor: "#3E5C76", margin: "1%"}}
                                type="submit"
                            >{isLoading ? "Loading..." : "Sign Up"}
                            </Button>
                        </div>
                        <div>
                            {/* {errors.map((err) => (
                                <div key={err}>{err}</div>
                            ))} */}
                        </div>
                    </Form>
            </Modal.Body>
            </Modal>
        );
    }
    
    return (
        <>
            <Button 
                variant="primary" 
                onClick={() => setModalShow(true)}
                style={{ backgroundColor: "#3E5C76", margin: "1%" }}
            >Sign Up
            </Button>

            <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </>
    )
}
