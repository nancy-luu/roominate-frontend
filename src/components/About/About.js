import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';

import "./about.scss"

export default function About( ) {

  return (
    <div className="about-page">
      <Row className="about-container">
        <div className="about-wrap">
          <img src="images/AboutImg.png"></img>
        </div>
        <div className="about-wrap">
            <div className="about-title">about this project:</div>
            <br></br>
            <div className="about-body">
            Thanks for visiting <i><b style={{color: '#6C63FF'}}>Roominators</b></i> ! 
            </div>
            <div className="about-body">
            This website was created in an attempt to solve a need to find the right people for big and small tasks around the house. As someone with a background in architecture and construction - I was often asked by friends and family if I knew an electrician / a plumber / or handy-person who was open to extra work. And reversely, subcontractors would often ask to be referred to other home owners that I was working with.
            </div>
            <br></br>
            <div className="about-body">
            Now with this application,
            <div className="about-body">home owners and trades people alike can <b style={{color: '#6C63FF'}}>connect directly</b> and get the help and extra work both parties are looking for.
            </div>
            </div>
            <br></br>
            <div className="about-body">
            This project utilizes React.js for the frontend along with other frameworks such as Bootstrap and SCSS. The backend was developed with Ruby on Rails in conjunction with the Cloudinary API to enable users to <b style={{color: '#6C63FF'}}>fully customize</b> their profiles and task listing images.
            </div>
        </div>
      </Row>
    </div>
    )
}