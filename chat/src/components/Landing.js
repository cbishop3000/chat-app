import React, { useContext, useEffect} from 'react'
import SignupLogin from "../components/SignLogin"
import UserContext from "../Context/UserContext"
import { useHistory } from "react-router-dom"

const Landing = (props) => {
    const { userData } = useContext(UserContext)
    const history = useHistory()

    useEffect(() => {
        if(userData.user) history.push("/home")
    }, [userData.user, history])

    return (
        <div>
            <SignupLogin />
        </div>
    )
}

export default Landing
