import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Select from "react-select";
import MyListingCard from "../MyListingCard/MyListingCard";
import ProfileCard from "./ProfileCard";
import MyInvoice from "./MyInvoice"

import "./profile.scss";

export default function Profile({
  user,
  setUser,
  userList,
  isLoading,
  setIsLoading,
  categoryList,
  locationList,
  currUser,
  token,
  loadingRequest,
  setLoadingRequest,
  listings,
  userType,
}) {
  const API = "http://localhost:3000";
  const [listingModalShow, setListingModalShow] = React.useState(false);
  const [listing, setListing] = useState(null);
  const [errors, setErrors] = useState([]);
  const [file, setFile] = useState(null);
  const [myInvoices, setMyInvoices] = useState(null);
  const [invoiceTotal, setInvoiceTotal] = useState(null);
  const [paidStyle, setPaidStyle] = useState("")
  const [showFileName, setShowFileName] = useState("")
  const myToken = localStorage.getItem("token");
  let title;
  let category;
  let location;
  let price;
  let desc;

  console.log(currUser.id);

  useEffect(() => {
    setIsLoading(true);
    fetch(`${API}/my_invoices`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then((r) => {
      if (r.ok) {
        r.json().then((myInvoices) => setMyInvoices(myInvoices));
        setIsLoading(false);
      }
    });
  }, [loadingRequest]);

  useEffect(() => {
    setIsLoading(true);
    fetch(`${API}/my_invoices_total`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then((r) => {
      if (r.ok) {
        r.json().then((invoiceTotal) => setInvoiceTotal(invoiceTotal));
        setIsLoading(false);
      }
    });
  }, [loadingRequest]);


  function handleAddListing(e) {
    e.preventDefault();
    console.log("added!");

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
        user_id: currUser.id,
      }),
    }).then((r) => {
      r.json().then((listing) => {
        setListing(listing);
        console.log(listing);
        setListingModalShow(false);
        setIsLoading(false);
        const formData = new FormData();
        formData.append("image", file);
        formData.append("listing_id", listing.id);
        fetch(`http://localhost:3000/listing_photos/${listing.id}`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${myToken}`,
          },
          body: formData,
        }).then((r) => {
          if (r.ok) {
            setLoadingRequest(loadingRequest + 1);
            return r.json();
          }
        });
        setListingModalShow(false);
      });
    });
  }

  const handleListPic = (e) => {
    setShowFileName(e.target.files[0].name)
    setFile(e.target.files[0]);
  };

  function handleCreateTitle(e) {
    e.preventDefault();
    title = e.target.value;
  }

  function handleCreateCategory(e) {
    category = e.value;
  }

  function handleCreateLocation(e) {
    location = e.value;
  }

  function handleCreatePrice(e) {
    e.preventDefault();
    price = e.target.value;
  }

  function handleCreateDesc(e) {
    e.preventDefault();
    desc = e.target.value;
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
          <Form onSubmit={handleAddListing}>
            <input 
              id="img"
              type="file"
              name='photo' 
              accept='image/*'
              onChange={handleListPic}
              style={{display:"none"}}
            />
            <label for="img" className="upload-image-btn">Upload Image</label>
            <div id="filesname" className="file-name">Chosen file: <b>{showFileName}</b></div>
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
                style={{ backgroundColor: "#6C63FF", margin: "1%" }}
                type="submit"
              >
                {isLoading ? "Loading..." : "Submit"}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }

  return (
    <div className="profile-page">
        <Container className="profile-wrapper">
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
                showFileName={showFileName}
                setShowFileName={setShowFileName}
            />
        </Container>
      <div className="middle-bar">
        <Container>
          <Col className="titlebanner">
            <div className="mylistingtitle">my listings:</div>
          </Col>
          <Col>
            <button
              className="add-listings-btn"
              variant="primary"
              style={{ backgroundColor: "#6C63FF", margin: "1%" }}
              onClick={() => setListingModalShow(true)}
            >
              add
            </button>
          </Col>
          {currUser.listings ? 
            <div>
            {currUser.listings.length === 0 ? (
                <Container className="no-listing-wrapper">
                <img className="no-inbox-img" src="images/nolistings.png"></img>
                <div className="no-listing-text">
                    ( you currently have no listings )
                </div>
                </Container>
            ) : (
                <Container className="my-listings-wrapper">
                <Row
                    xs={1}
                    md={4}
                    className="g-4"
                    className="d-flex justify-content-center"
                >
                    {currUser.listings.map((listing) => (
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
                        showFileName={showFileName}
                        setShowFileName={setShowFileName}
                    />
                    ))}
                </Row>
                </Container>
                )}
                </div>

                :
                <></>
            }
        </Container>
        <AddListingModal
          show={listingModalShow}
          onHide={() => setListingModalShow(false)}
        />
      </div>
      <div className="invoice-section">
          <Container>
            <Col className="titlebanner">
                <div className="myinvoicetitle">my invoices:</div>
            </Col>
            <Container className="no-invoice-container">
                <Container className="invoice-container">
                    <Row className="invoice-labels">
                        <Col className="mylisting-date">date:</Col>
                        <Col className="mylisting-from">from:</Col>
                        <Col className="mylisting-to">to:</Col>
                        <Col className="mylisting-task">task:</Col>
                        <Col className="mylisting-desc">description:</Col>
                        <Col className="mylisting-amount">amount:</Col>
                        <Col></Col>
                    </Row>
                    {myInvoices ? 
                        myInvoices.map((i) => (
                            <MyInvoice 
                            singleInvoice={i}
                            key={i.id}
                            currUser={currUser}
                            setIsLoading={setIsLoading} 
                            isLoading={isLoading}
                            setIsLoading={setIsLoading}
                            loadingRequest={loadingRequest}
                            setLoadingRequest={setLoadingRequest}
                            />
                            ))
                            :
                            <></>
                        }
                    <div className="myinvoice-owed">unpaid invoice totals:</div>
                    <div className="myinvoice-owed-number">$ {invoiceTotal}</div>
                </Container>
            </Container>
          </Container>
      </div>
    </div>
  );
}
