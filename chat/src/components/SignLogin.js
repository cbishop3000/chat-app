import React, { useEffect, useContext } from 'react'
import Signup from "./Signup"
import Login from "./Login"
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import UserContext from "../Context/UserContext"

const SignLogin = () => {
    const { userData, setUserData } = useContext(UserContext)

    useEffect(() => {
        console.log("THE TOKEN", userData.token)
    }, [userData])

    return (
        <div>
            <Popup
                modal
                trigger={<button className="btn btn-danger button">Sign up</button>}
            >
                <Signup></Signup>
            </Popup>
            <Popup
                modal
                trigger={<button className="btn btn-danger button">Log In</button>}
            >
                <Login></Login>
            </Popup>

        </div>
    )
}

export default SignLogin
