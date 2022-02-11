import { Row, Col } from "react-bootstrap";

import "./message.scss"

export default function Message ({ singleMessage }){

    if (!singleMessage) {
        return(
            <></>
        )
    }
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
                <div className="message-sender">{singleMessage? singleMessage.user_id : "0"}</div>
                </Col>
            </Row>
            <div className="message-blob">
                {singleMessage? singleMessage.message : "No Messages"}
            </div>
        </div>
    )

}