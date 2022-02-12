import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import { Link } from 'react-router-dom';
import Container from "react-bootstrap/Container";
import Select from 'react-select'
import makeAnimated from 'react-select/animated'
import ListingCard from "./ListingCard"; 

import "./listings.scss"

export default function Listings ({ token, user, setUser, isLoading, setIsLoading, listing, setListing, categoryList, locationList, userList }){

    function customTheme(theme){
        return {
            ...theme,
            colors: {
                ...theme.colors,
                primary25: '#9F99FF',
                primary: '#9F99FF'
            },   
            multiValueRemove: (styles) => ({
                ...styles,
                color: '#9F99FF',
                ':hover': {
                  backgroundColor: '#9F99FF',
                  color: 'white',
                },
            }),
        };
    };

    return (
        <div>
            <div className="help-search-container">
                <Row>
                    <Col>
                        <div className="search-title">search:</div>
                    </Col>
                    <Col>
                        <Select 
                            components={makeAnimated()}
                            className="basic-multi-select"
                            theme={customTheme}
                            classNamePrefix="select"
                            placeholder="by category?"
                            isMulti
                            options={categoryList} 
                            // value={userList}
                            // onChange={handleOnChange}
                        ></Select>
                    </Col>
                    <Col>
                        <Select 
                            components={makeAnimated()}
                            className="basic-multi-select"
                            theme={customTheme}
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