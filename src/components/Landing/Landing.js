import React from "react";
import { Row, Col } from "react-bootstrap";
import Login from '../Login/Login';
import SignUp from '../SignUp/SignUp';

import "./landing.scss"

export default function Landing( { onLogin, setLoadingRequest, loadingRequest, setCurrUser }) {

    return (
        <div>
            <div className="landing-container" id="landing">
                <div className="imgContainer">
                    <img 
                        className="background" 
                        src="images/LandingImage.png" 
                        alt="landing" 
                        style={{ width: '135rem', height: '62rem' }}
                    />
                </div> 
                <div className="wrapper">
                    <div className="intro">
                        <div className="intro__text__container">
                            <h1 className="intro__text">Roominate</h1>
                        </div>
                    </div>
                        <div className="intro__text__container">
                            <h2 className="intro__text">Find The Right Help!</h2>
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
                            loadingRequest={loadingRequest} setLoadingRequest={setLoadingRequest}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

