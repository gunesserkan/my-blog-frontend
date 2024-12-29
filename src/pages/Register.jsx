import React from 'react'
import FormRegister from '../components/forms/FormRegister'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { registerUser } from '../redux/slices/authSlice'
import '../css/register.css'


function Register() {
    const dispatch = useDispatch()

    const navigate = useNavigate()

    const handleRegister = async (name, username, password, email) => {
        const result = await dispatch(registerUser({ name, username, password, email }));
        if (registerUser.fulfilled.match(result)) {
            navigate('/profile');
        }
    }

    return (
        <div className='register-container'>
            <FormRegister register={handleRegister} />
        </div>
    )
}

export default Register