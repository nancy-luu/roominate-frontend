import React, { useState } from "react";
import Conversation from "../Conversation/Conversation"; 
import Message from "../Message/Message"; 


import "./inbox.scss"


export default function Inbox ({ user, setUser, currUser }){

    if (currUser.username) {
        // console.log(currUser.conversations[0].header)
        return (
            <div className="inbox-wrapper">
                <div className="inbox-img-container">
                    <img 
                        className="inbox-img"
                        src="images/inbox-icon.png"
                    ></img>
                </div>
                <div className="inbox-container">
                    <div className="inbox-left">
                        <div className="conversation-left">
                            {currUser.conversations.map((c) =>
                                <Conversation
                                    myConversation={c}
                                    key={c.id}
                                />
                            )}
                        </div>
                    </div>
                    <div className="inbox-right">
                        <div className="message-container">
                            {currUser.conversations[0].messages.map((m) =>
                                <Message
                                    singleMessage={m}
                                    key={m.id}
                                />
                            )}
                            <input className="chat-input"></input>
                            <button 
                                className="send-btn"
                                style={{ backgroundColor: "#9F99FF", margin: "1%", }}
                            >send</button>
                        </div>
                    </div>
            </div>
            </div>
        )
    }else{
        return(
            <></>
        )
    }
}
