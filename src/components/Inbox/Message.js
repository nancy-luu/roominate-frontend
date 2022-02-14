import { Row, Col } from "react-bootstrap";

import "./message.scss"

export default function Message ({ singleMessage, user, userList }){

    console.log(singleMessage)
    console.log(singleMessage.user_id)
    console.log(userList)

    const findMessageUser = userList.filter((u) => {
        if (u.user_photo.id === singleMessage.user_id){
            console.log(singleMessage.user_id)
            console.log(u.user_photo.id)
            console.log(u.user_photo.image)
            return true
        }
    })

    console.log(findMessageUser)

    const foundUserPhoto = findMessageUser.map((p) => (
        <img 
            className="sender-image"
            src={p.user_photo.image}
            style={{ width: '7rem' }}
        />
    ))

    const foundUseName = findMessageUser.map((p) => (
        <div className="sender-name" style={{ width: '5rem' }} >
            {p.username}
        </div>
    ))

    if (!singleMessage) {
        return(
            <></>
        )
    }
    return (
        <div className="message-container">
            <Row>
                <Row>
                {foundUserPhoto}
                {foundUseName}
                </Row>
            </Row>
            <div className="message-blob">
                {singleMessage? singleMessage.message : "No Messages"}
            </div>
        </div>
    )

}