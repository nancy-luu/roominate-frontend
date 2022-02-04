
import "./conversation.scss"


export default function Conversation (){
    return (
        <div className="conversation-container">
            <div className="conversation-card">
                <div className="conversation-title">Title</div>
                <h5>Between users</h5>
                <h5>Date</h5>
                <h5>Message Count</h5>
                <button 
                    className="see-btn"
                    style={{ backgroundColor: "#9F99FF", margin: "1%"}}
                >See Thread</button>
            </div>
        </div>
    )
}