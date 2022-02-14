
import "./conversation.scss"


export default function Conversation ({ myConversation, showMessages, setShowMessages }){

    console.log(myConversation)

    return (
        <div className="conversation-container">
            <div className="conversation-card">
                <div className="conversation-title">title:</div>
                <div> {myConversation.header}</div>
                <div className="conversation-title">users:</div>
                <div> {myConversation.user.username} & {myConversation.user2.username}</div>
                <div className="conversation-title">date:</div>
                <div>{myConversation.created_at}</div>
                <button 
                    className="see-btn"
                    style={{ backgroundColor: "#9F99FF", margin: "1%"}}
                    onClick={() => setShowMessages(true)} 
                >See Thread</button>
            </div>
        </div>
    )
}