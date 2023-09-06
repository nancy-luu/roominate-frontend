import React from "react";
import { Row, Col } from "react-bootstrap";
import Login from './Login';
import SignUp from './SignUp';

import "./landing.scss"

export default function Landing({ onLogin, setLoadingRequest, loadingRequest, setCurrUser, categoryList, userType, locationList }) {

    return (
        <div className="landing-container" id="landing">
            <div className="imgContainer">
            </div> 
            <div className="big-wrapper">
                <div className="landing-wrapper">
                    <div className="landingtitle">Roominate</div>
                    <div className="landingtext">Find The Right Help!</div>
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

