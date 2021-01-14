import React, { useContext, useState } from 'react'
import UserContext from "../Context/UserContext";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { toast } from 'react-toastify'

const Signup = () => {
    const { userData, setUserData } = useContext(UserContext)
    const [form, setForm] = useState({})
    const history = useHistory()

    const onChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const submit = async e => {
        e.preventDefault()
        try {
            await axios.post("http://localhost:6000/users/register", form)
        } catch(err) {
            toast.error(err.response.data.msg)
        }
    }

    return (
        <div>
            <form onSubmit={submit}>
            <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input
                type="email"
                className="form-control"
                name="email"
                onChange={onChange}
                placeholder="Enter email"
            />
            </div>
            <div className="form-group">
            <label htmlFor="displayName">Username</label>
            <input
                type="text"
                className="form-control"
                name="displayName"
                onChange={onChange}
                placeholder="Enter email"
            />
            </div>
            <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
                type="text"
                className="form-control"
                name="password"
                onChange={onChange}
                placeholder="Enter password"
            />
            </div>
            <div className="form-group">
            <label htmlFor="passwordCheck">Re-Enter Password</label>
            <input
                type="text"
                className="form-control"
                name="passwordCheck"
                onChange={onChange}
                placeholder="Enter password again"
            />
            </div>
            <div>
            <button type="submit" className="btn btn-primary submit">
                Submit
            </button>
            </div>
            <span>
            <label for="userAgreeBox"><input type="checkbox" id="userAgreeBox" name="userAgreeBox" value="" required></input>
                Check when read
            </label>
            </span>
        </form>
        </div>
    )
}

export default Signup
