import React from 'react'
import FormRegister from '../components/forms/FormRegister'

function Register() {

    const handleRegister = (isLogin) => {
        console.log(isLogin)
    }
    return (
        <div>
            <FormRegister onSubmit={handleRegister} />
        </div>
    )
}

export default Register