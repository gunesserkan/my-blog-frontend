import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from '../pages/Login'
import Home from '../pages/Home'
import Register from '../pages/Register'
import Profile from '../pages/Profile'

function RouterConfig() {

    return (
        <Routes>
            <Route exac path={`/home`} element={<Home />} />
            <Route exac path={`/login`} element={<Login />} />
            <Route exac path={`/register`} element={<Register />} />
            <Route exac path={`/profile`} element={<Profile />} />
        </Routes>
    )
}

export default RouterConfig