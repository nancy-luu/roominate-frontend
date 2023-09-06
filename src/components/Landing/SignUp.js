import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Select from "react-select";

export default function SignUp({
  onLogin,
  setLoadingRequest,
  loadingRequest,
  categoryList,
  userType,
  locationList,
}) {
  const API = "http://localhost:3000";
  const [modalShow, setModalShow] = React.useState(false);
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showChargeInput, setShowChargeInput] = useState(true);

  let username;
  let email;
  let password;
  let user_type;
  let user_location;
  let user_charge;
  let user_desc;

  function handleSubmit(e) {
    e.preventDefault();
    setErrors([]);
    setIsLoading(true);
    fetch(`${API}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        username,
        email,
        password,
        user_type,
        user_location,
        user_charge,
        user_desc,
      }),
    }).then((r) => {
      setIsLoading(false);
      if (r.ok) {
        r.json().then((user) => {
          localStorage.setItem("token", user.token);
          onLogin(user);
          setLoadingRequest(loadingRequest + 1);
        });
      } else {
        r.json().then((err) => {
          console.log(err.errors);
          setErrors(err.errors);
        });
      }
    });
  }

  function handleUserType(e) {
    user_type = e.value;
    if (e.value === "Home Owner") {
      user_charge = 0; // Set charge to zero for Home Owners
      setShowChargeInput(false); // Hide charge input for Home Owners
    } else {
      setShowChargeInput(true); // Show charge input for other user types
    }
  }

  function handleUserLocation(e) {
    user_location = e.value;
  }

  function handleSetName(e) {
    e.preventDefault();
    username = e.target.value;
  }

  function handleSetEmail(e) {
    e.preventDefault();
    email = e.target.value;
  }

  function handleSetPassword(e) {
    e.preventDefault();
    password = e.target.value;
  }

  function handleSetAbout(e) {
    e.preventDefault();
    user_desc = e.target.value;
  }

  function handleSetCharge(e) {
    e.preventDefault();
    user_charge = e.target.value;
    if (user_type !== "Home Owner") {
      user_charge = parseInt(user_charge); // Parse the charge as an integer
    }
  }

  function MyVerticallyCenteredModal(props) {
    const { showChargeInput } = props;

    return (
      <Modal
        {...props}
        size="m"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Welcome!</Modal.Title>
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
              type="user_type"
              options={userType}
              onChange={handleUserType}
            ></Select>
            {showChargeInput && (
                <div className="form-group">
                <label>Charge*</label>
                <input
                    className="form-control"
                    placeholder="per hour?"
                    autoComplete="on"
                    value={user_charge}
                    onChange={handleSetCharge}
                ></input>
                </div>
            )}
            <label>Location*</label>
            <Select
              type="user_location"
              options={locationList}
              onChange={handleUserLocation}
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
                style={{ backgroundColor: "#6C63FF", margin: "1%" }}
                type="submit"
              >
                {isLoading ? "Loading..." : "Sign Up"}
              </Button>
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
        onClick={() => setModalShow(true)}
        style={{ margin: "1%" }}
      >
        sign Up
      </button>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        showChargeInput={showChargeInput}
      />
    </>
  );
}
