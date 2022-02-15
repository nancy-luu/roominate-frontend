import React, { useState } from "react";
import Conversation from "./Conversation"; 
import Message from "./Message";

import "./inbox.scss"


export default function Inbox ({ user, currUser, userList }){
    const [showMessages, setShowMessages] = useState(false)

    // function handleSendMessage(e) {
    //     e.preventDefault();
    //     fetch("http://localhost:3000/conversations", {
    //         method: "POST",
    //         headers: {
    //           "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify({
    //             message:
    //             user:
    //             user2:
    //         }),
    //     })
    //     .then((r)=>{
    //         if (r.ok) {
    //           r.json().then((vacation) => {
    //             handleOtherSubmit(vacation);
    //             setVacationRequest(vacationRequest+1)
    //             navigate("/vacations")
    //           })
    //         } else {
    //           r.json().then((err) => setErrors(err.errors));
    //         }
    //     })
    // }

    console.log(currUser)

    // prevent error page when currUser is not yet valid
    if (!currUser.username) {
        return(
            <></>
        )
    }
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
                    <div className="inbox-titles">conversations:</div>
                    <div className="conversation-left">
                        {currUser.conversations? currUser.conversations.map((c) =>
                            <Conversation
                                myConversation={c}
                                key={c.header}
                                setShowMessages={setShowMessages}
                                showMessages={showMessages}
                            />
                        ) : <>you have no conversations</>}
                    </div>
                </div>
                <div className="inbox-right">
                    <div className="inbox-titles">messages:</div>
                    <div className="message-container">
                        {showMessages ? 
                            currUser.conversations[0].messages.map((m) =>
                                <Message
                                    singleMessage={m}
                                    key={m.id}
                                    user={user}
                                    userList={userList}
                                />
                            ) : <></>}
                        <input className="chat-input"></input>
                        <button 
                            className="send-btn"
                            style={{ backgroundColor: "#9F99FF", margin: "1%", }}
                            // onSubmit={}
                        >send</button>
                    </div>
                </div>
        </div>
        </div>
    )
}
