import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import '../css/login.css'
import { login } from '../redux/slices/authSlice'
import FormLogin from '../components/forms/FormLogin'
import FormRegister from '../components/forms/FormRegister'
import { useNavigate } from 'react-router-dom'
import { Password } from '@mui/icons-material'

function Login() {
    const dispatch = useDispatch()

    const navigate = useNavigate()

    const handleLogin = (username, password) => {
        dispatch(login({ username, password }));
        navigate("/home")
        const token = localStorage.getItem("bearerToken")
    }

    //TODO: login ve register sayfalarını yap
    return (
        <div className='login-container'>
            <FormLogin login={handleLogin} />
        </div>
    )
}

export default Login