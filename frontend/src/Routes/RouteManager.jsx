import React from 'react'
import { Route, Routes } from 'react-router-dom'

import NotFound from '../components/NotFound/NotFound'
import Home from '../components/Home/Home'
import Login from '../components/Login/Login'
import Dashboard from '../components/dashboard/dashboard'
import SignUp from '../components/signUp/Regitster'

function RouteManager() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    )
}

export default RouteManager