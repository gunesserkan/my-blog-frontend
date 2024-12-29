import React from 'react'
import { loginFormSchema } from '../../schemas/LoginFormSchema';
import { useFormik } from 'formik'
import TextField from '@mui/material/TextField';
import '../../css/formlogin.css'
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

function FormLogin({ login }) {

    const navigate = useNavigate()


    const submit = (values, action) => {
        const { username, password } = values
        login(username, password)
    }


    const { values, errors, handleChange, handleSubmit } = useFormik({
        initialValues: {
            username: '',
            password: ''
        },
        validationSchema: loginFormSchema,
        onSubmit: submit
    });

    const redirectRegister = () => {
        navigate("/register")
    }

    return (
        <form className='form-login' onSubmit={handleSubmit}>
            <div className='login-form-title'><h2 >LOGIN</h2></div>
            <TextField
                className='input-username'
                id='username'
                label="Username"
                value={values.username}
                onChange={handleChange}
                sx={{ marginBottom: '10px' }}
            />
            <TextField
                className='input-password'
                id='password'
                label="password"
                value={values.password}
                type='password'
                onChange={handleChange}
                sx={{ marginBottom: '10px' }}
            />
            <div className='login-button'>
                <Button variant="outlined" color='inherit' type='submit'>Login</Button>
                <p style={{ color: 'InfoText' }}>Don't have an account?<span onClick={redirectRegister} style={{ color: 'red', cursor: 'pointer' }}>Click here</span></p>
            </div>
        </form >
    )
}

export default FormLogin