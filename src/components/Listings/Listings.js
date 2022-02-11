import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import { Row, Col } from "react-bootstrap";
import { Link } from 'react-router-dom';
import Select from 'react-select'
import ListingCard from "../ListingCard/ListingCard"; 

import "./listings.scss"

export default function Listings ({ token, user, setUser, isLoading, setIsLoading, listing, setListing, categoryList, locationList, userList }){

    return (
        <div>
            <div className="help-search-container">
                <Row>
                    <Col>
                        <h4>search:</h4>
                    </Col>
                    <Col>
                        <Select 
                            className="basic-multi-select"
                            classNamePrefix="select"
                            placeholder="by category?"
                            options={categoryList} 
                            // value={userList}
                            // onChange={handleOnChange}
                        ></Select>
                    </Col>
                    <Col>
                        <Select 
                            className="basic-multi-select"
                            classNamePrefix="select"
                            placeholder="by location?"
                            options={locationList} 
                            // value={userList}
                            // onChange={handleOnChange}
                        ></Select>
                    </Col>
                    <Col className="find-btn-container">
                        <button 
                            className="find-btn"
                            style={{ backgroundColor: "#6C63FF"}}
                        >find</button>
                    </Col>
                </Row>
            </div>
            <Container className="listings-wrapper">
                <Row
                    xs={1}
                    md={4}
                    className="g-4"
                    className="d-flex justify-content-center"
                >
                {listing.map((l) => 
                    <ListingCard 
                        userList={userList}
                        token={token}
                        isLoading={isLoading} 
                        setIsLoading={setIsLoading} 
                        user={user} 
                        setUser={setUser}
                        listing={listing}
                        setListing={setListing}
                        singlelisting={l} 
                        key={l.id}
                    />
                )}
                </Row>
            </Container>
        </div>
    )

}