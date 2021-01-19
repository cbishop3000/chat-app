import React, { useState, useEffect, useContext } from 'react'
import axios from "axios"
import UserContext from "../Context/UserContext"
import { useHistory, Link } from "react-router-dom"

const Navbar = () => {

    const { userData, setUserData } = useContext(UserContext);
    const [friendName, setFriendName] = useState(null)

    const history = useHistory()

    const logout = () => {
        setUserData({
          token: undefined,
          user: undefined,
        });
        localStorage.setItem("auth-token", "");
        history.push("/")
    };

    const handleChange = (e) => {
        setFriendName(e.target.value)
        console.log(friendName)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const { data } = await axios.post("http://localhost:6000/friends/sendrequest", { email: friendName }, {
                headers: { "x-auth-token": localStorage.getItem("auth-token")}
            })

            setFriendName((friend) => ({ ...friend, list: data }))
            console.log({email: friendName})
        } catch(err) {
            console.log(err)
        }
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand" href="#">{userData.displayName}</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <a className="nav-link" href="/home">Home<span class="sr-only">(current)</span></a>
                    </li>
                    <li className="nav-item active">
                        <a className="nav-link" href="/chat">Chat<span class="sr-only">(current)</span></a>
                    </li>
                    </ul>
                    <form className="form-inline my-2 my-lg-0">
                    <input 
                        className="form-control mr-sm-2" 
                        type="search" 
                        placeholder="Search Friends" 
                        aria-label="Search"
                        onChange={handleChange}
                         />
                        <button onClick={handleSubmit} className="btn btn-primary btn-edits">
                            Submit
                        </button>
                        
                    </form>
                </div>
                {userData.token ? (
                        <Link to="/">
                            <button onClick={logout} className="btn btn-danger btn-edits">
                                Sign out
                            </button>
                        </Link>
                ) : (
                    null
                )}
                </nav>
                
        </div>
    )
}

export default Navbar
