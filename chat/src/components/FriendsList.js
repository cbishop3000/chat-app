import React, { useState, useContext, useEffect } from 'react'
import { useHistory, Link } from "react-router-dom";
import "./styles.css"
import axios from "axios"
import UserContext from "../Context/UserContext"

import { Button } from "react-bootstrap"

const FriendsList = (props) => {
    const { userData } = useContext(UserContext);
    const [friend, setFriend] = useState({ list: [] })
    const history = useHistory();

    useEffect(() => {
        if (!userData.user) history.push("/");
      }, [userData.user, history]);

    useEffect(() => { (async () => {
        try {
            const { data } = await axios.post("http://localhost:6000/friends/getfriends", null, {
                headers: { "x-auth-token": localStorage.getItem("auth-token")}
            })

            setFriend((friend) => ({ ...friend, list: data }))
        } catch(err) {
            console.log(err)
        }
    })()
    }, [])

    return (
        <div class="friends-wrapper">
            <nav id="sidebar">
                <div class="sidebar-header">
                    <h3>Friends</h3>
                </div>
                {friend.list.friends !== undefined ? (
                    friend.list.friends.map((friendRequest, index) => {
                        
                        return <div className="request-container" key={index}>
                                    <div className="profile-image">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-file-person" viewBox="0 0 16 16">
                                                <path d="M12 1a1 1 0 0 1 1 1v10.755S12 11 8 11s-5 1.755-5 1.755V2a1 1 0 0 1 1-1h8zM4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H4z"/>
                                                <path d="M8 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                                            </svg>
                                        </div>
                                    <h5 className="request-name">{friendRequest}</h5>
                                    <div className="icons"> 
                                </div>
                        </div>
                        }
                    )) : (
                        null
                    )
                }
            </nav>
        </div>
    )
}

export default FriendsList
