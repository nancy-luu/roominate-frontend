import React, { useState, useEffect } from "react";
import { Row, Col } from 'react-bootstrap';
import { FaCheck } from 'react-icons/fa'
import Container from "react-bootstrap/Container";
import FeatUserSlider from "../Community/FeatUserSlider"; 
import FeaturedListing from "../Community/FeaturedListing"; 
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import "./community.scss"
const API = 'http://localhost:3000'


export default function Community( ) {
  const [featUsers, setFeatUsers] = useState([])
  const [featListings, setFeatListings] = useState([])
  const token = localStorage.getItem("token");


  useEffect(() => {
      fetch(`${API}/featured_users`, {
          headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
      }).then((r) => {
        if (r.ok) {
          r.json().then((featUsers) => setFeatUsers(featUsers));
        }
      });
  }, []);

  useEffect(() => {
    fetch(`${API}/featured_listings`, {
      headers:{
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then((r) => {
      if (r.ok){
        r.json().then((featListings) => setFeatListings(featListings));
      }
    })
  }, []);

  return (
    <div className="community-wrapper">
        <div className="top-image-wrapper">
          <Container className="image-container">
            <Row 
              xs={1}
              md={2}
            >
              <Col className="image-side">
                <img 
                  className="top-image" 
                  src="images/communitytop.jpg" 
                  alt="landing" 
                  style={{ width: '40rem', height: '23rem' }}
                />
              </Col>
              <Col className="top-desc-wrapper">
                <div className="top-title">Roominate is here for you</div>
                <div className="top-desc">
                  <FaCheck style={{ width: '3rem', height: '1rem', color: "#6C63FF" }}/>
                  Search by category and location
                </div>
                <div className="top-desc">
                  <FaCheck style={{ width: '3rem', height: '1rem', color: "#6C63FF" }}/>
                  Connect directly through chat
                </div>
                <div className="top-desc">
                  <FaCheck style={{ width: '3rem', height: '1rem', color: "#6C63FF" }}/>
                  Find the right people and the right help
                </div>
              </Col>
            </Row>
          </Container>
        </div>
        <Container Container className="articles-wrapper">
          <div className="community-header">articles & info:</div>
          <Row 
            xs={1}
            md={3}
          >
            <Col className="article-card">
              <Card style={{ width: '25rem', height: '25rem' }}>
                <Card.Img 
                  variant="top" 
                  src="https://www.nepalhomes.com/public/blog/E1DA7D38C219C39-Home-Money.gif" 
                  style={{ width: '25rem', height: '25rem' }}
                />
                <Card.Body>
                  <Card.Title>Home Owner's Guide</Card.Title>
                  <Card.Text>
                    Ways to save when designing, renovating, and furnishing your new home.
                  </Card.Text>
                  <Button variant="primary">Learn More</Button>
                </Card.Body>
              </Card>
            </Col>
            <Col className="article-card">
              <Card style={{ width: '25rem', height: '25rem' }}>
                <Card.Img 
                  variant="top" 
                  src="https://images.adsttc.com/media/images/5f2c/8545/b357/65db/c000/008c/large_jpg/FEAT_ID.jpg?1596753213" 
                  style={{ width: '25rem', height: '25rem' }}
                />
                <Card.Body>
                  <Card.Title>Design Trends of 2022</Card.Title>
                  <Card.Text>
                    Seeking for ideas and inspiration? Look no further! 
                  </Card.Text>
                  <Button variant="primary">Learn More</Button>
                </Card.Body>
              </Card>
            </Col>
            <Col className="article-card">
              <Card style={{ width: '25rem', height: '25rem' }}>
                <Card.Img 
                  variant="top" 
                  src="https://images.squarespace-cdn.com/content/v1/5407107de4b0f4290349404a/1412011216885-H9CIUEQ27FLNE1F92I7K/volunteers+group+shot.jpg" 
                  style={{ width: '25rem', height: '25rem' }}
                />
                <Card.Body>
                  <Card.Title>Roominators Give Back</Card.Title>
                  <Card.Text>
                    Join our initiative to contribute to our local communities.
                  </Card.Text>
                  <Button variant="primary">Learn More</Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
        <Container>
          <div className="community-header">featured romminators:</div>
          <FeatUserSlider featUsers={featUsers} token={token} />
        </Container>
        <Container>
          <div className="community-header">featured listings:</div>
          <Row
            xs={1}
            md={4}
            className="g-4"
            className="d-flex justify-content-center"
          >
          {featListings.map((ft) => (
            <FeaturedListing 
              featListings={featListings} 
              token={token}
              singleFeatListing={ft}
              key={ft.id}
            />
          ))}
          </Row>
        </Container>
    </div>
    )
}

