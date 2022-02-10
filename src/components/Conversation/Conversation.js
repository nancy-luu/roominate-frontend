
import "./conversation.scss"


export default function Conversation ({ myConversation }){

    return (
        <div className="conversation-container">
            <div className="conversation-card">
                <div className="conversation-title">Title:</div>
                <div> {myConversation.header}</div>
                <h5>Between users: {myConversation.user.username} & {myConversation.user2.username}</h5>
                <h5>Date: {myConversation.created_at}</h5>
                <button 
                    className="see-btn"
                    style={{ backgroundColor: "#9F99FF", margin: "1%"}}
                >See Thread</button>
            </div>
        </div>
    )
}