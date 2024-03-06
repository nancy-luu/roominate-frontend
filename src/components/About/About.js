import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';

import "./about.scss"

export default function About({ currUser }) {

  return (
    <div className="about-page">
      <div className="about-container">
        <div className="about-left">
          <img src="images/AboutImg.png"></img>
        </div>
        <div className="about-right">
            <div className="about-title">Welcome, <b style={{color: '#6C63FF'}}>{currUser.username}</b>!</div>
            <br></br>
            <div className="about-body">
            </div>
            <div className="about-body">
            With this application,
            <div className="about-body">
              home owners and trades people alike can <b style={{color: '#6C63FF'}}>connect directly</b> and get the help and extra work both parties are looking for.
            </div>
            </div>
            <br></br>

        </div>
      </div>
    </div>
    )
}