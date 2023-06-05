import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import axios from '../common/axios';
import useAuth from '../hooks/useAuth'
import './login.style.css'
const Login = () => {

    const { setAuth } = useAuth()

    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/";

    const [email, setEmail] = useState("sample1@gmail.com")
    const [password, setPassword] = useState("1001")
    const [error, setError] = useState(null)

    const login = () => {

        setError(null)

        axios.post('/auth/login', {
            email,
            password
        }).then(res => {
            console.log(res.data)
            setAuth(res.data.data)
            localStorage.setItem("userDetails", JSON.stringify(res.data.data))
            navigate(from)
        }).catch(Err => {

            let message = Err?.response?.data?.message || Err.message
            setError(message)
            console.log(Err)
        })

    }

    return (
        <div className='logincontainer'>
            <div className='login-body'>
                <h1 style={{
                    textAlign: 'center'
                }}>Login</h1>
                <div>
                    <input className='logininput' type="text" placeholder='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div>
                    <input className='logininput' type="password" placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                {error && <p className='textStyle' style={{color:'red',fontSize:'0.8rem'}}>{error}</p>}
                <button className='loginbutton' onClick={login}>Login</button>
            </div>
        </div>
    )
}

export default Login