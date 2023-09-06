import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Select from 'react-select'
import makeAnimated from 'react-select/animated'


import RoominatorCard from "./RoominatorCard"; 

import "./roominators.scss"

export default function Roominators ({ user, currUser, userType, locationList, isLoading, setIsLoading, userList, setUserList, token, loadingRequest, setLoadingRequest }){
    const [userCategory, setUserCategory] = useState("")
    const [userLocation, setUserLocation] = useState("")


    function handleSetCategorySearch (e){
        setUserCategory(e)
    }

    function handleSetLocationSearch (e){
        setUserLocation(e.value)
    }

    const usersToDisplay = userList.filter((user) => {
        if (userCategory === "" && userLocation === ""){
            return true
        }

        if (userCategory === "" && userLocation === user.user_location) {
            return true
        }

        let return_val = false
        if (userLocation === "") {
            userCategory.forEach((category) => {
                if (category.value === user.user_type){
                    return_val = true
                }
                
            })
        }

        if (userLocation == user.user_location && userCategory !== ""){
            userCategory.forEach((category) => {
                console.log(category.value)
                console.log(user.user_type)
                if (category.value === user.user_type){
                    return_val = true
                }
            })
        }
        return return_val
        
        return false
    })

    console.log(usersToDisplay)

    const filteredUsers = usersToDisplay.map((user) => (
        <RoominatorCard 
            user={user}
            currUser={currUser}
            isLoading={isLoading} 
            setIsLoading={setIsLoading} 
            userList={userList} 
            setUserList={userList} 
            singleUser={user}
            key={user.id}
            token={token}
            loadingRequest={loadingRequest}
            setLoadingRequest={setLoadingRequest}
        />
    ))

    console.log(userCategory)


    function customTheme(theme){
        return {
            ...theme,
            colors: {
                ...theme.colors,
                primary25: '#9F99FF',
                primary: '#9F99FF'
            },
        };
    };


    return (
        <div className="room-page-wrapper">
            <div className="help-search-container">
                <Row>
                    <Col>
                        <div className="search-title">search:</div>
                    </Col>
                    <Col>
                        <Select 
                            className="basic-multi-select"
                            components={makeAnimated()}
                            theme={customTheme}
                            classNamePrefix="select"
                            placeholder="by user type?"
                            noOptionsMessage={() => 'Add a category!'}
                            isMulti
                            options={userType} 
                            onChange={handleSetCategorySearch}
                        ></Select>
                    </Col>
                    <Col>
                        <Select 
                            className="basic-multi-select"
                            components={makeAnimated()}
                            theme={customTheme}
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
                    className="d-flex justify-content-center"
                >
                {filteredUsers}
                </Row>
            </Container>
        </div>
    )

}