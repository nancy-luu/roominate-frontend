import { Row, Col } from "react-bootstrap";

import "./message.scss"

export default function Message ({ singleMessage, user, userList }){

    console.log(singleMessage.user_id)


    const findMessageUser = userList.filter((u) => {
        if (u.user_photo.id === singleMessage.user_id){
            return true
        }
    })

    const foundUserPhoto = findMessageUser.map((p) => (
        <img
            className="sender-image"
            key={p.id}
            src={p.user_photo.image}
            style={{ width: '7rem' }}
        />
    ))

    const foundUserName = findMessageUser.map((p) => (
        <div className="message-sender" key={p.id} style={{ width: '5rem' }} >
            {p.username}
        </div>
    ))

    if (!singleMessage) {
        return(
            <></>
        )
    }
    return (
        <div className="message-wrapper">
            {singleMessage.user_id === user.id ?
                <div className="my-message-container">
                    <div className="my-message-blob">
                        {singleMessage? singleMessage.message : "No Messages"}
                    </div>
                    <Row className="my-info">
                        <Col className="my-photo">
                            {foundUserPhoto}
                        </Col>
                    </Row>
                </div>
                :
                <div className="their-message-container">
                    <div className="their-message-blob">
                        {singleMessage? singleMessage.message : "No Messages"}
                    </div>
                    <Row>
                        <Row className="their-info">
                            <Col className="their-photo">
                                {foundUserPhoto}
                            </Col>
                        </Row>
                    </Row>
                </div>
            }

        </div>
    )

}