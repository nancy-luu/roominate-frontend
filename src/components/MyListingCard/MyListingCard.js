import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import {MdOutlineDeleteForever} from 'react-icons/md';
import Card from 'react-bootstrap/Card'
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Select from 'react-select'
import MyListingPhoto from "./MyListingPhoto"; 



import "./mylistingcard.scss"

export default function MyListingCard ({ isLoading, setIsLoading, categoryList, locationList, token, listing, loadingRequest, setLoadingRequest, id, currUser, listings }){
    const [myListModalShow, setMyListModalShow] = React.useState(false);
    const [file, setFile] = useState(null);
    const myToken = localStorage.getItem("token");


    function handleRemove(e){
        const myListing = e.target.id
        console.log("listing id: ")
        console.log(myListing)
        // fetch(`http://localhost:3000/listings/${myListing}`, {
        //     method: 'DELETE',
        //     headers: {
        //         Authorization: `Bearer ${myToken}`,
        //     },
        // })
        // .then(res =>{
        //     if(res.ok){
        //         console.log(res)
        //         setLoadingRequest(loadingRequest+1)
        //     } else {
        //         res.json().then(console.log)
        //     }
        // })
    }

    function handleUpdateListing (e){
        e.preventDefault();

        const formData = new FormData()
        formData.append('image', file)
        formData.append('listing_id', listing.id)

        fetch('http://localhost:3000/listing_photos', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${myToken}`,
            },
            body: formData
        }).then((r) => {
            if (r.ok){
                setLoadingRequest(loadingRequest+1)
                return r.json()
            }
        }).then((data) => console.log(data))
    }

    const handleListPic = (e) => {
        e.persist()
        console.log("this is the file", e.target.files[0])
        setFile(e.target.files[0]);
    }

    function EditListingModal(props) {
        return (
            <Modal
                {...props}
                size="m"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Update Listing Info:
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                    <Form 
                        onSubmit={handleUpdateListing} 
                        id={id} 
                        >
                        <input 
                            type="file"
                            name='photo' 
                            accept='image/*'
                            onChange={handleListPic}
                        />
                        {/* <input type="hidden" name="user_id" value={setUserId(currentUser.id)}/> */}
                        <button type='submit' value='Submit'>Submit</button>
                        <div className="form-group">
                            <label>Title*</label>
                            <input 
                                className="form-control" 
                                placeholder="Enter Title..." 
                                // onChange={handleSetActivityName}
                            ></input>
                        </div>
                        <div className="form-group">
                            <label className="listing-category">Category*</label>
                            <Select  
                                className="basic-multi-select"
                                options={categoryList} 
                                // value={participants}
                                // onChange={handleOnChange}
                            />
                        </div>
                        <div className="form-group">
                            <label className="listing-location">Location*</label>
                            <Select 
                                className="basic-multi-select"
                                options={locationList} 
                                // value={participants}
                                // onChange={handleOnChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>Estimated Cost*</label>
                            <h5>$</h5>
                            <input 
                                type="cost" 
                                className="form-control" 
                                id="cost-input" 
                                placeholder="0"
                                autoComplete="on"
                                // onChange={handleSetActivityCost}
                            ></input>
                        </div>
                        <div className="form-group">
                            <label>Description*</label>
                            <input 
                                className="form-control" 
                                placeholder="Enter Description..."
                                autoComplete="on"
                                // onChange={handleSetActivityDesc}
                            ></input>
                        </div>
                        <div>
                            <button 
                                className="listing-modal-submit"
                                style={{ backgroundColor: "#9F99FF", margin: "1%"}}
                                type="submit"
                            >{isLoading ? "Loading..." : "Submit"}
                            </button>
                        </div>
                    </Form>
            </Modal.Body>
            </Modal>
        );
    }    

    // let postedBy = userList.filter((pb) => {
    //     if (pb.id == mySingleListing[0].user_id) {
    //         return pb.username
    //     }
    // })

    // console.log(listing.listing_photos_id)
    // console.log(currUser.listing_photo)

    


    // const getListingPhoto = currUser.listing_photo.forEach((lp) => {
    //     if (lp.id === listing.listing_photos.id) 
    //     return lp.image
    // })

    // console.log(getListingPhoto)



    return (
        <div className="my-listing-card-wrapper">
            <div className="listing-card-container">
                <Card style={{width: '20rem', height: '28rem'}} id={listing.id}>
                    <MyListingPhoto 
                        isLoading={isLoading} 
                        setIsLoading={setIsLoading} 
                        token={token} 
                        listing={listing}
                        currUser={currUser}
                        listings={listings}
                    />
                    <Card.Body>
                        <Card.Title><b>{listing.title}</b></Card.Title>                    
                        {/* <Row>
                            <Card.Text>Posted By: {listing.category}</Card.Text>
                        </Row> */}
                        <Row>
                            <Card.Text><b>Category:</b> {listing.category}</Card.Text>
                        </Row>
                        <Row>
                            <Card.Text><b>Charge:</b> ${listing.price} /hr</Card.Text>
                        </Row>
                        <Row>
                            <Card.Text><b>Location:</b> {listing.location}</Card.Text>
                        </Row>
                        <Row>
                            <Card.Text><b>Description:</b> {listing.desc}</Card.Text>
                        </Row>
                        <button 
                            className="delete-btn"
                            style={{ backgroundColor: "#6C63FF", margin: "1%"}}
                            onClick={handleRemove}
                            id={id} 
                        ><MdOutlineDeleteForever style={{ width: '1.5rem', height: '1.5rem' }}/></button>
                        <button
                            id={id} 
                            className="mylisting-edit-btn"
                            style={{ backgroundColor: "#6C63FF", margin: "1%"}}
                            onClick={() => setMyListModalShow(true)} 
                        >edit</button>
                    </Card.Body>
                </Card>
            </div>
            <EditListingModal
                show={myListModalShow}
                onHide={() => setMyListModalShow(false)}
            />
        </div>
    )

}