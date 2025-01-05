import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import '../css/login.css'
import { login } from '../redux/slices/authSlice'
import FormLogin from '../components/forms/FormLogin'
import { useNavigate } from 'react-router-dom'

function Login() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    // Redux store'dan auth durumunu al
    const { isAuth } = useSelector(state => state.auth)

    const handleLogin = (username, password) => {
        dispatch(login({ username, password }));
    }

    // Yönlendirme işlemi için useEffect kullan
    useEffect(() => {
        if (isAuth) {
            navigate("/profile")  // Eğer kullanıcı giriş yaptıysa yönlendir
        }
    }, [isAuth, navigate])  // isAuthenticated değişirse yönlendirme gerçekleşir

    return (
        <div className='login-container'>
            <FormLogin login={handleLogin} />
        </div>
    )
}

export default Login
