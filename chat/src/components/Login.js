import React, { useContext, useState } from 'react'
import UserContext from "../Context/UserContext"
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import { toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
    const { userData, setUserData } = useContext(UserContext)
    const [form, setForm] = useState({})
    const history = useHistory()

    const onChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const submit = async e => {
        e.preventDefault()

        try {
            const loginRes = await axios.post("http://localhost:6000/users/login", {
                email: form.email,
                password: form.password
            })

            setUserData({ 
                token: loginRes.data.token,
                user: loginRes.data.user
            })

            localStorage.setItem("auth-token", loginRes.data.token)
            history.push("/")
        } catch(err) {
            toast.error(err.response.data.msg)
        }
    }

    return (
        <div>
            <form onSubmit={submit}>
                <div class="form-group">
                    <label htmlFor="email">Email address</label>
                    <input
                    type="email"
                    name="email"
                    onChange={onChange}
                    class="form-control"
                    placeholder="Enter email"
                    />
                </div>
                <div class="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input
                    type="password"
                    name="password"
                    onChange={onChange}
                    class="form-control"
                    placeholder="Password"
                    />
                </div>
                <button type="submit" class="btn btn-primary">
                    Submit
                </button>
            </form>
        </div>
    )
}

export default Login
