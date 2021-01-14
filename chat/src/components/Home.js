import React, { useContext, useEffect } from 'react'
import Sidebar from "./Sidebar"
import FriendList from "./FriendsList"
import UserContext from "../Context/UserContext"
import 'bootstrap/dist/css/bootstrap.min.css'
import { useHistory } from 'react-router-dom'

const Home = () => {
    const { userData } = useContext(UserContext)
    const history = useHistory()

    useEffect(() => {
        if(!userData.user) history.push("/")
    }, [userData.user, history])

    return (
        <div>
            <FriendList />   
            <Sidebar />
        </div>
    )
}

export default Home
