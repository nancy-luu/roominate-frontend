import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Select from 'react-select'
import { Row, Col } from "react-bootstrap";

import RoominatorCard from "../RoominatorCard/RoominatorCard"; 

import "./roominators.scss"

export default function Roominators ({ userType, locationList, isLoading, setIsLoading, userList, setUserList, token }){


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
            <Container className="roominators-wrapper">
                <Row
                    xs={1}
                    md={4}
                    className="g-4"
                    className="d-flex justify-content-center"
                >
                {userList.map((u) => 
                    <RoominatorCard 
                        isLoading={isLoading} 
                        setIsLoading={setIsLoading} 
                        userList={userList} 
                        setUserList={userList} 
                        singleUser={u}
                        key={u.id}
                        token={token}
                    />
                )}
                </Row>
            </Container>
        </div>
    )

}