import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import { Link } from 'react-router-dom';
import Container from "react-bootstrap/Container";
import Select from 'react-select'
import makeAnimated from 'react-select/animated'
import ListingCard from "./ListingCard"; 

import "./listings.scss"

export default function Listings ({ token, user, setUser, isLoading, setIsLoading, listings, setListings, categoryList, locationList, userList }){
    const [listingCategory, setListingCategory] = useState("")
    const [listingLocation, setListingLocation] = useState("")

    // console.log(listing)

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

    function handleCategorySearch(e){
        setListingCategory(e)
    }

    function handleLocationSearch(e){
        setListingLocation(e.value)
    }

    const listingsToDisplay = listings.filter((l) => {
        if (listingCategory === "" && listingLocation === ""){
            return true
        }

        if (listingCategory ==="" && listingLocation === l.location){
            return true
        }

        let return_val = false;
        if (listingLocation === ""){
            listingCategory.forEach((category) => {
                if (category.value === l.category){
                    return_val = true
                }
            })
        }

        if (listingLocation == l.location && listingCategory !== ""){
            console.log()
            listingCategory.forEach((category) => {
                if (category.value === l.category){
                    return_val = true
                }
            })
        }

        return return_val

        return false
    })

    // console.log(listingsToDisplay)

    const filteredListings = listingsToDisplay.map((listing) => (
        <ListingCard 
            userList={userList}
            token={token}
            isLoading={isLoading} 
            setIsLoading={setIsLoading} 
            user={user} 
            setUser={setUser}
            listing={listing}
            setListings={setListings}
            singlelisting={listing} 
            key={listing.id}
        />
    ))

    console.log(filteredListings)

    return (
        <div className="listing-page-wrapper">
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
                            onChange={handleCategorySearch}
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
                            onChange={handleLocationSearch}
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
                {filteredListings}

                {/* {listing.map((l) => 
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
                )} */}
                </Row>
            </Container>
        </div>
    )

}