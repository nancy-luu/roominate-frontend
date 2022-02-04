import Card from 'react-bootstrap/Card'
import { Row, Col } from "react-bootstrap";
import {MdOutlineDeleteForever} from 'react-icons/md';


import "./mylistingcard.scss"

export default function MyListingCard (){

    function handleRemove(){
        console.log("DELETE!")
    }

    return (
        <div className="my-listing-card-container">
            <Card style={{ width: '20rem', height: '27rem' }}>
                <Card.Img 
                    className="my-listing-image"
                    variant="top" 
                    src="https://media.istockphoto.com/vectors/home-icon-flat-vector-illustration-design-vector-id1162202962?k=20&m=1162202962&s=170667a&w=0&h=q9Y9VlP2pgoJOpSdwLLTIS64_cyREBOULeVXf2OtBuU=" 
                    style={{ width: '10rem', height: '10rem' }}
                />
                <Card.Body>
                    <Card.Title>Title</Card.Title>
                    <Row>
                        <Card.Text>Category:</Card.Text>
                    </Row>
                    <Row>
                        <Card.Text>Charge:</Card.Text>
                    </Row>
                    <Row>
                        <Card.Text>Location:</Card.Text>
                    </Row>
                    <Row>
                        <Card.Text>Description:</Card.Text>
                    </Row>
                    <button 
                        className="delete-btn"
                        style={{ backgroundColor: "#6C63FF", margin: "1%"}}
                        onClick={handleRemove}
                    ><MdOutlineDeleteForever style={{ width: '2.5rem', height: '2.5rem' }}/></button>
                </Card.Body>
            </Card>
        </div>
    )

}