import { Row, Col } from "react-bootstrap";

import "./message.scss"

export default function Message (){
    return (
        <div className="message-container">
            <Row>
                <Col>
                <img 
                    className="profile-image"
                    variant="top" 
                    src="https://nanuntio.com/wp-content/uploads/2020/03/service_default_avatar_182956.png" 
                    style={{ width: '3rem', height: 'rem' }}
                />
                </Col>
                <Col>
                <div className="message-sender">Sender Name</div>
                </Col>

            </Row>
            <div className="message-blob">
                something something something something something something something something something something something something something something something something something something something something
            </div>
        </div>
    )

}