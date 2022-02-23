import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import "./login.scss"


export default function Login( { onLogin, setCurrUser, setLoadingRequest, loadingRequest }) {
    const API = 'http://localhost:3000'
    const [modalShow, setModalShow] = React.useState(false);


    function MyVerticallyCenteredModal(props) {
        const [errors, setErrors] = useState([]);
        const [isLoading, setIsLoading] = useState(false);
        const [username, setUsername] = useState("");
        const [password, setPassword] = useState("");

        function handleLoginSubmit(e) {
            e.preventDefault();
            setIsLoading(true);
            fetch(`${API}/login`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
              },
              body: JSON.stringify({ 
                    username: username,
                    password: password,
                }),
            })
            .then((r) => {
              setIsLoading(false);
              if (r.ok) {
                r.json().then((user) => {
                    localStorage.setItem("token", user.token);
                    setUsername("");
                    setPassword("");
                    setCurrUser({username:"", email:"" , Listings:[]})
                    setLoadingRequest(loadingRequest+1)
                    onLogin(user);
                });
              } else {
                r.json().then((err) => setErrors(err));
              }
            });
        }

        return (
            <Modal
                {...props}
                size="m"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                Welcome Back!
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                    <Form onSubmit={handleLoginSubmit}>
                        <div className="form-group">
                            <label>User Name*</label>
                            <input 
                                type="username" 
                                className="form-control" 
                                id="username-input" 
                                placeholder="Enter User Name" 
                                onChange={(e) => setUsername(e.target.value)}
                                autoComplete="off"
                                value={username}
                            ></input>
                        </div>
                        <div className="form-group">
                            <label>Password*</label>
                            <input 
                                type="password" 
                                className="form-control" 
                                id="password-input" 
                                placeholder="Password"
                                autoComplete="current-password"
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                            ></input>
                        </div>
                        <div>
                            <Button 
                                style={{ backgroundColor: "#6C63FF", margin: "1%"}}
                                type="submit"
                            >{isLoading ? "Loading..." : "Log In"}
                            </Button>
                        </div>
                        <div>
                            {errors.map((err) => (
                                <div key={err}>{err}</div>
                            ))}
                        </div>
                    </Form>
            </Modal.Body>
            </Modal>
        );
    }

    return (
        <>
            <button 
                className="login-button" 
                variant="primary" 
                onClick={() => setModalShow(true)
            }>
                login
            </button>

            <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </>
    )
}
