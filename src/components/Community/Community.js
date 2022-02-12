import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import FeaturedUser from "../Community/FeaturedUser"; 
import FeaturedLister from "../Community/FeaturedLister"; 
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';



import "./community.scss"

export default function Community( ) {

  return (
    <div className="community-wrapper">
      <div className="community-header">articles & info:</div>
        <Row 
          xs={1}
          md={3}
          className="g-4"
          className="d-flex justify-content-center"
        >
          <Col className="article-card">
            <Card style={{ width: '30rem', height: '26rem'}}>
              <Card.Img variant="top" src="https://www.nepalhomes.com/public/blog/E1DA7D38C219C39-Home-Money.gif" />
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
            <Card style={{ width: '30rem', height: '26rem'}}>
              <Card.Img variant="top" src="https://images.squarespace-cdn.com/content/v1/5407107de4b0f4290349404a/1412011216885-H9CIUEQ27FLNE1F92I7K/volunteers+group+shot.jpg" />
              <Card.Body>
                <Card.Title>Roominators Give Back</Card.Title>
                <Card.Text>
                  Join our initiative to contribute to our local communities.
                </Card.Text>
                <Button variant="primary">Learn More</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col className="article-card">
            <Card style={{ width: '30rem', height: '26rem'}}>
              <Card.Img variant="top" src="https://images.adsttc.com/media/images/5f2c/8545/b357/65db/c000/008c/large_jpg/FEAT_ID.jpg?1596753213" />
              <Card.Body>
                <Card.Title>Design Trends of 2022</Card.Title>
                <Card.Text>
                  Seeking for ideas and inspiration? Look no further! 
                </Card.Text>
                <Button variant="primary">Learn More</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <div className="community-header">featured romminators:</div>
        <FeaturedUser/>
        <div className="community-header">featured listings:</div>
        <FeaturedLister/>
    </div>
    )
}