import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Conversation from "./Conversation"; 
import "./inbox.scss"
const API = 'http://localhost:3000'




export default function Inbox ({ user, currUser, userList, setIsLoading, loadingRequest, setLoadingRequest}){
    const [myConvos, setMyConvos] = useState([])
    const token = localStorage.getItem("token");


    useEffect(() => {
        setIsLoading(true);
        if (token) {
            fetch(`${API}/my_conversations`, {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            })
            .then(resp => resp.json())
            .then((myConvos) => {
                setMyConvos(myConvos);  
                setIsLoading(false);
            });   
        }
    }, [loadingRequest]) 

    console.log(myConvos)

    console.log(currUser.conversations)

    return (
        <>  
            {myConvos.length > 0 ? 
                <Container className="inbox-wrapper">
                    <div className="inbox-img-container">
                        <img 
                            className="inbox-img"
                            src="images/inbox-icon.png"
                        ></img>
                    </div>
                    <div className="inbox-container">
                        <div className="inbox-left">
                            <div className="conversation-left">
                                {myConvos? myConvos.map((c) =>
                                    <Conversation
                                        singleConversation={c}
                                        key={c.id}
                                        user={user}
                                        userList={userList}
                                        setIsLoading={setIsLoading}
                                        loadingRequest={loadingRequest}
                                        setLoadingRequest={setLoadingRequest}
                                        myConvos={myConvos}
                                    />
                                ) : <>you have no conversations</>}
                            </div>
                        </div>
                    </div>
                </Container>
                :
                <Container className="inbox-wrapper">
                    <div className="inbox-img-container">
                        <img 
                            className="no-inbox-img"
                            src="images/emptyinbox.png"
                        ></img>
                    </div>
                    <div className="inbox-container">
                        <div className="inbox-left">
                            <div className="inbox-titles">Sorry, {user.username}</div>
                            <div className="conversation-left">
                                Your inbox is empty!
                            </div>
                        </div>
                    </div>
                </Container>
            
            }
        </>
    )
}
