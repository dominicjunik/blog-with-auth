import axios from 'axios'

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

let emptyForm = { 
    username: '',
    password: '',
    email: ''
}

function Login({ setUser }) {

    const navigate = useNavigate()

    let [form, setForm] = useState(emptyForm)

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const authResponse = await axios.post('/auth/login', form)
            const token = authResponse.data.token
    
            if (!token) {
                setForm(emptyForm)
                return
            }
    
            localStorage.setItem("token", token)
    
            const userResponse = await axios.get('/api/users', {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem('token')}`
                }
              })
    
            setUser(userResponse.data)
            await axios.put('/api/users')
            navigate('/posts')

        } catch(err) {

            console.log(err)
            alert(err.response.data.error)

        }
    }
    
    return ( 
        <>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username:</label>
                <br />
                <input 
                    type="text" 
                    id="username"
                    name="username"
                    onChange={handleChange}
                    value={form.username}
                />
                <br /><br />
                <label htmlFor="password">Password:</label>
                <br />
                <input 
                    type="password" 
                    id="password"
                    name="password"
                    onChange={handleChange}
                    value={form.password}
                />
                <br /><br />
                <button>Submit</button>
            </form>
        </>
     );
}

export default Login;