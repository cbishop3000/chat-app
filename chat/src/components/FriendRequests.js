import React, { useState, useEffect, useContext, useRef } from 'react'
import { useHistory } from "react-router-dom";
import UserContext from "../Context/UserContext";
import axios from 'axios'
import "./styles.css"

import { Button } from "react-bootstrap"

const Sidebar = (props) => {
    const { userData } = useContext(UserContext);
    const [friendRequest, setFriendRequest] = useState({ list: [] })
    const history = useHistory();
    const friendInput = useRef(null)

    useEffect(() => {
        if (!userData.user) history.push("/");
      }, [userData.user, history]);

    useEffect(() => { (async () => {
        try {
            const { data } = await axios.post("http://localhost:6000/friends/getusersrequests", null, {
                headers: { "x-auth-token": localStorage.getItem("auth-token")}
            })

            setFriendRequest((friendRequest) => ({ ...friendRequest, list: data }))
        } catch(err) {
            console.log(err)
        }
    })()
    }, [friendRequest])

    return (
        <div class="request-wrapper">
            <nav id="sidebar">
                <div class="sidebar-header">
                    <h3>Friend Requests</h3>
                </div>
                {friendRequest.list.friendRequest !== undefined ? (
                    friendRequest.list.friendRequest.map((friendRequest, index) => {
                        const friendRequestId = friendRequest

                        const acceptFriendRequest = async (e) => {
                            e.preventDefault()
                            await axios.post("http://localhost:6000/friends/acceptfriendrequest", { request: friendRequestId }, 
                            {
                                headers: { "x-auth-token": localStorage.getItem("auth-token")}
                            })

                            console.log(friendRequestId)
                        }

                        const deleteFriendRequest = async (e) => {
                            e.preventDefault()
                            await axios.post("http://localhost:6000/friends/deletefriendrequest", { request: friendRequestId }, 
                            {
                                headers: { "x-auth-token": localStorage.getItem("auth-token")}
                            })

                            console.log(friendRequestId)
                        }

                        return <div className="request-container" key={index}>
                            <div className="profile-image">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-file-person" viewBox="0 0 16 16">
                                        <path d="M12 1a1 1 0 0 1 1 1v10.755S12 11 8 11s-5 1.755-5 1.755V2a1 1 0 0 1 1-1h8zM4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H4z"/>
                                        <path d="M8 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                                    </svg>
                                </div>
                                
                            <h5 ref={friendInput} className="request-name">{friendRequest}</h5>
                            <div className="icons">
                                <div className="icon-position">
                                    <Button onClick={acceptFriendRequest} className="pretty-button">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-check2" viewBox="0 0 16 16">
                                            <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
                                        </svg>
                                    </Button>
                                    
                                </div>
                                <div className="icon-position">
                                    <Button onClick={deleteFriendRequest} className="pretty-button">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
                                            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                                        </svg>
                                    </Button>
                                </div>
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

export default Sidebar
