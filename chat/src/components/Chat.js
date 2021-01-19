import React, { useContext } from 'react'
import FriendsList from "../components/FriendsList"

const Chat = ({ displayName }) => {
    return (
        <div className="chat-container">
            
            <form>
                    <div className="friend-name-container">
                    
                        <p className="friend-name">
                            {displayName}
                        </p>
                    </div>
                <div className="friend-box">
                <FriendsList />
                </div>
                <div className="button-position">   
                    <button className="btn btn-primary btn-edits">
                        Send
                    </button>
                    <input type="email" class="form-control" placeholder="Say Something..." />
                </div>
            </form>
        </div>
    )
}

export default Chat
