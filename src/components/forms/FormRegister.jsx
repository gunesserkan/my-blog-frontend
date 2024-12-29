import React from 'react'
import { registerFormSchemas } from '../../schemas/RegisterFormSchema';
import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import '../../css/formRegister.css'

function FormRegister({ register }) {

    const navigate = useNavigate()


    const submit = (values) => {
        const { name, username, password, email } = values
        register(name, username, password, email)

    }


    const { values, errors, handleChange, handleSubmit } = useFormik({
        initialValues: {
            name: '',
            username: '',
            password: '',
            confirmPassword: '',
            email: '',
            terms: ''

        },
        validationSchema: registerFormSchemas,
        onSubmit: submit
    });

    return (
        <form className='form-register' onSubmit={handleSubmit}>
            <div className='register-form-title'><h2 >Registration Form</h2></div>
            <TextField
                className='input-name'
                id='name'
                label={errors.name ? errors.name : "Name"}
                value={values.name}
                error={Boolean(errors.name)}
                onChange={handleChange}
                sx={{ marginBottom: '10px' }}
            />

            <TextField
                className='input-username'
                id='username'
                label={errors.username ? errors.username : "Username"}
                value={values.username}
                error={Boolean(errors.username)}
                onChange={handleChange}
                sx={{ marginBottom: '10px' }}
            />


            <TextField
                className='input-email'
                id='email'
                label={errors.email ? errors.email : "Email"}
                value={values.email}
                error={Boolean(errors.email)}
                onChange={handleChange}
                sx={{ marginBottom: '10px' }}
            />

            <TextField
                className='input-password'
                id='password'
                label={errors.password ? errors.password : "Password"}
                value={values.password}
                error={Boolean(errors.password)}
                type='password'
                onChange={handleChange}
                sx={{ marginBottom: '10px' }}
            />

            <TextField
                className='input-confirmPassword'
                id='confirmPassword'
                label={errors.confirmPassword ? errors.confirmPassword : "Confirm Password"}
                value={values.confirmPassword}
                error={Boolean(errors.confirmPassword)}
                type='password'
                onChange={handleChange}
                sx={{ marginBottom: '10px' }}
            />

            <div className='register-button'>
                <Button variant="outlined" color='inherit' type='submit'>Submit</Button>
            </div>
        </form >
    )
}

export default FormRegister