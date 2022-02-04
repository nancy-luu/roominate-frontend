import Conversation from "../Conversation/Conversation"; 
import Message from "../Message/Message"; 


import "./inbox.scss"


export default function Inbox (){
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
                        <Conversation/>
                    </div>
                </div>
                <div className="inbox-right">
                    <div className="message-container">
                        {/* map through conversation for all messages */}
                        <Message/>
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

}
