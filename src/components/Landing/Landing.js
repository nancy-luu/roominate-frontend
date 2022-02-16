import React from "react";
import { Row, Col } from "react-bootstrap";
import Login from './Login';
import SignUp from './SignUp';

import "./landing.scss"

export default function Landing({ onLogin, setLoadingRequest, loadingRequest, setCurrUser, categoryList, userType, locationList }) {

    return (
        <div className="landing-container" id="landing">
            <div className="imgContainer">
                <img 
                    className="background" 
                    src="images/landingpurple.jpg" 
                    alt="landing" 
                    style={{ width: '135rem', height: '62rem' }}
                />
            </div> 
            <div className="wrapper">
                <div className="landing-wrapper">
                    <div className="landingtitle">Roominate</div>
                    <div className="landingtext">
                        <p>Find The Right Help!</p>
                    </div>
                </div>
                <div className="login-wrapper">
                    <Login
                        setLoadingRequest={setLoadingRequest}
                        loadingRequest={loadingRequest} 
                        onLogin={onLogin}
                        setCurrUser={setCurrUser}
                        />
                    <SignUp 
                        onLogin={onLogin}
                        loadingRequest={loadingRequest} 
                        setLoadingRequest={setLoadingRequest}
                        categoryList={categoryList}
                        userType={userType}
                        locationList={locationList}
                    />
                </div>
            </div>
        </div>
    )
}

