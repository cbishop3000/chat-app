import React, { useState, useEffect } from "react"
import Home from "./components/Home"
import axios from "axios";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import UserContext from "./Context/UserContext";

import Navbar from "./components/Navbar"
import Landing from "./components/Landing"

const App = () => {
  const [userData, setUserData] = useState({
    user: undefined,
    token: undefined
  })

  const checkLoggedIn = async () => {
    let token = localStorage.getItem("auth-token")

    if(token === null) {
      localStorage.setItem("auth-token", "")
      token = ""
    }

    const tokenRes = await axios.post("http://localhost:6000/users/tokenIsValid", null, {
      headers: { "x-auth-token": token }
    })

    if (tokenRes.data) {
      const userRes = await axios.get("http://localhost:6000/users/", {
        headers: { "x-auth-token": token }
      })

      setUserData({
        token,
        user: userRes.data
      })
    } else {
      localStorage.setItem("auth-token", "")
      token = ""
    }
  }
  
  useEffect(() => {
    checkLoggedIn()
  })

  return (
    <div className="App">
      <BrowserRouter>
        <UserContext.Provider value={{ userData, setUserData }}>
          <Navbar />
          <Switch>
            <Route exact path="/home" component={Home} />
            <Route exact path="/" component={Landing} />
          </Switch>
        </UserContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
