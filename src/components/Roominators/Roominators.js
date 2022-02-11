import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Select from 'react-select'
import { Row, Col } from "react-bootstrap";

import RoominatorCard from "../RoominatorCard/RoominatorCard"; 

import "./roominators.scss"

export default function Roominators ({ userType, locationList, isLoading, setIsLoading, userList, setUserList, token }){
    const [userCategory, setUserCategory] = useState("")
    const [userLocation, setUserLocation] = useState("")


    function handleSetCategorySearch (e){
        setUserCategory(e.target.value)
    }

    function handleSetLocationSearch (e){
        setUserLocation(e.target.value)
    }

    // const usersToDisplay = userList.filter((user) => {
    //     if (userCategory === "" && userLocation === ""){
    //         return true
    //     }

    //     // make if statements for all combinations?
    // })

    // const filteredUsers = usersToDisplay.map((user) => (
    //     <RoominatorCard 
    //         isLoading={isLoading} 
    //         setIsLoading={setIsLoading} 
    //         userList={userList} 
    //         setUserList={userList} 
    //         singleUser={user}
    //         key={user.id}
    //         token={token}
    //     />
    // ))

    // console.log(userList)

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
                            placeholder="by user type?"
                            value={userCategory}
                            options={userType} 
                            onChange={handleSetCategorySearch}
                        ></Select>
                    </Col>
                    <Col>
                        <Select 
                            className="basic-multi-select"
                            classNamePrefix="select"
                            placeholder="by location?"
                            options={locationList} 
                            onChange={handleSetLocationSearch}
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
                {/* {filteredUsers} */}
                {userList.length > 0 &&
                    userList.map((u) => 
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