
import "./conversation.scss"


export default function Conversation ({ myConversation, showMessages, setShowMessages }){

    return (
        <div className="conversation-container">
            <div className="conversation-card">
                <div className="conversation-title">Title:</div>
                <div> {myConversation.header}</div>
                <div className="conversation-title">Users:</div>
                <div> {myConversation.user.username} & {myConversation.user2.username}</div>
                <div className="conversation-title">Date:</div>
                <h5>{myConversation.created_at}</h5>
                <button 
                    className="see-btn"
                    style={{ backgroundColor: "#9F99FF", margin: "1%"}}
                    onClick={() => setShowMessages(true)} 
                >See Thread</button>
            </div>
        </div>
    )
}