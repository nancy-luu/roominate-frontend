import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import Message from "./Message";
import "./conversation.scss"
const API = 'http://localhost:3000'



export default function Conversation ({ singleConversation, showMessages, setShowMessages, toggleMessages, user, userList, setIsLoading, loadingRequest }){
    const [messageCount, setMessageCount] = useState(0)
    const token = localStorage.getItem("token");

    // console.log(singleConversation.messages)
    // console.log(user.id)

    const myMessages = singleConversation.messages.filter((myMessage) => {
        if (myMessage.user_id === user.id){
            return true
        }
    })

    console.log(myMessages)

    function toggleMessages(){
        // console.log(showMessages)
        setShowMessages(true)
    }

    useEffect(() => {
        setIsLoading(true);
        if (token) {
            fetch(`${API}/message_count/${singleConversation.id}`, {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            })
            .then(resp => resp.json())
            .then((messageCount) => {
                setMessageCount(messageCount);  
                setIsLoading(false);
            });   
        }
      }, [loadingRequest]) 

    return (
        <Row className="conversation-container">
            <div className="conversation-card">
                <div className="conversation-title">" {singleConversation.header} "</div>
                <Row>
                    <Col className="info-left">
                        <div className="conversation-text">from:</div>
                        <div className="conversation-info"> {singleConversation.user2.username}</div>
                    </Col>
                    <Col className="info-center">
                        <div className="conversation-text">date:</div>
                        <div className="conversation-info">{singleConversation.created_at}</div>
                    </Col>
                    <Col className="info-right">
                        <div className="conversation-text">messages:</div>
                        <div className="conversation-info">{messageCount}</div>
                    </Col>
                </Row>
                <Row className="see-btn-container">
                    <button 
                        className="see-btn"
                        style={{ backgroundColor: "#9F99FF", margin: "1%"}}
                        // onClick={() => setShowMessages(true)} 
                        onClick={toggleMessages}
                    >See Thread</button>
                </Row>
            </div>
            <div className="message-container">
                {singleConversation.messages.map((m) => (
                    <Message
                    singleMessage={m}
                    key={m.id}
                    user={user}
                    userList={userList}
                    />
                ))}
                <input className="chat-input"></input>
                <button
                    className="send-btn"
                    style={{ backgroundColor: "#9F99FF", margin: "1%" }}
                    // onSubmit={}
                >send</button>
            </div>
        </Row>

    )
}