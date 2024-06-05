import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import HomePage from '../pages/HomePage/HomePage'
import Login from '../pages/Login/Login'
import Register from '../pages/Register/Register'
import { getUserData } from '../services/index.service'

const IndexRoute = () => {
  const user = getUserData

  return (
    <BrowserRouter>
      <Routes>
        {
          user ? <Route path="/" Component={HomePage} /> : <Route path="/" element={<Navigate to="/login" />} />
        }
        {
          user ? <Route path="/login" element={<Navigate to="/" />} /> : <Route path="/login" Component={Login} />
        }
        {
          user ? <Route path="/register" element={<Navigate to="/" />} /> : <Route path="/register" Component={Register} />
        }
      </Routes>
    </BrowserRouter>
  )
}

export default IndexRoute
