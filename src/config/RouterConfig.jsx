import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from '../pages/Login'
import Home from '../pages/Home'
import Register from '../pages/Register'

function RouterConfig() {

    return (
        <Routes>
            <Route exac path={`/home`} element={<Home />} />
            <Route exac path={`/login`} element={<Login />} />
            <Route exac path={`/register`} element={<Register />} />
        </Routes>
    )
}

export default RouterConfig