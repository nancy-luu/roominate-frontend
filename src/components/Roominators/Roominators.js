import React, { useState } from "react";
import Select from 'react-select'
import { Row, Col } from "react-bootstrap";

import RoominatorCard from "../RoominatorCard/RoominatorCard"; 

import "./roominators.scss"

export default function Roominators ({userType, locationList, isLoading, setIsLoading}){


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
                            placeholder="by user type?"
                            options={userType} 
                            // value={userList}
                            // onChange={handleOnChange}
                        ></Select>
                    </Col>
                    <Col>
                        <Select 
                            isMulti 
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
            <RoominatorCard isLoading={isLoading} setIsLoading={setIsLoading} />
        </div>
    )

}