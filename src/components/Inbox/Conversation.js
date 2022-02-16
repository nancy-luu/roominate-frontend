import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import Message from "./Message";
import "./conversation.scss"
const API = 'http://localhost:3000'



export default function Conversation ({ singleConversation, user, userList, setIsLoading, loadingRequest, setLoadingRequest, myConvos }){
    const [messageCount, setMessageCount] = useState(0)
    const [showMessage, setShowMessage] = useState(false);
    const [message, setMessage] = useState("")
    const token = localStorage.getItem("token");
    let messageText

    const myMessages = singleConversation.messages.filter((myMessage) => {
        if (myMessage.user_id === user.id){
            return true
        }
    })

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

    
    function handleSendMessage(){
        setIsLoading(true);
        fetch(`${API}/messages`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                message: messageText,
                user_id: user.id,
                conversation_id: singleConversation.id
            })
        }).then((r) => {
            if (r.ok){
                r.json().then((message) => {
                    setMessage(message)
                    setLoadingRequest(loadingRequest+1)
                })
            }
        })
        setMessage("")
    }

    
    function handleMessageInput(e){
        console.log(e.target.value)
        messageText = e.target.value

    }
    

    return (
        <Row className="conversation-container">
            <div className="conversation-card">
                <div className="conversation-title">" {singleConversation.header} "</div>
                <Row>
                    <Col className="info-left">
                        <div className="conversation-text">date:</div>
                        <div className="conversation-info">{singleConversation.created_at}</div>
                    </Col>
                    <Col className="info-center">
                        <div className="conversation-text">from:</div>
                        <div className="conversation-info"> {singleConversation.user2.username}</div>
                    </Col>
                    <Col className="info-center">
                        <div className="conversation-text">to:</div>
                        <div className="conversation-info"> {singleConversation.user.username}</div>
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
                        onClick={() => setShowMessage(!showMessage)}
                    >{showMessage? "x" : "more"}</button>
                </Row>
            </div>
                {showMessage ? 
                    <div className="fade-in">
                        {singleConversation.messages.map((m) => (
                            <Message
                            singleMessage={m}
                            key={m.id}
                            user={user}
                            userList={userList}
                            />
                        ))}
                        <input 
                            className="chat-input"
                            onChange={handleMessageInput}
                        ></input>
                        <button
                            className="send-btn"
                            style={{ backgroundColor: "#9F99FF", margin: "1%" }}
                            onClick={handleSendMessage}
                        >send</button>
                    </div>
                    :
                    <></>
                }
        </Row>

    )
}