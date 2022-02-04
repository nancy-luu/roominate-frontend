import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import { Link } from 'react-router-dom';
import Select from 'react-select'
import ListingCard from "../ListingCard/ListingCard"; 

import "./listings.scss"


export default function Listings ({ isLoading, setIsLoading, categoryList, locationList }){

    return (
        <div>
            <div className="help-search-container">
                <Row>
                    <Col>
                        <h3>Search:</h3>
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
            <ListingCard isLoading={isLoading} setIsLoading={setIsLoading}/>
        </div>
    )

}