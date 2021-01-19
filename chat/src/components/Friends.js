import React, { useContext, useEffect } from 'react'
import FriendRequests from "./FriendRequests"
import FriendList from "./FriendsList"
import UserContext from "../Context/UserContext"
import 'bootstrap/dist/css/bootstrap.min.css'
import { useHistory } from 'react-router-dom'
import "./styles.css"
import Chat from './Chat'

const Home = () => {
    const { userData } = useContext(UserContext)
    const history = useHistory()

    useEffect(() => {
        if(!userData.user) history.push("/")
    }, [userData.user, history])

    return (
        <div>
            <div className="friends-list-container">
                <FriendRequests />
                <FriendList />
             </div>
        </div>
        
        
    )
}

export default Home
