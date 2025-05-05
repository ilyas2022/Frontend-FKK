import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Analytics } from "@vercel/analytics/react"
import HomePage from './pages/HomePage'
import Login from './pages/Login'
import Generate from './pages/Generate'
import Pricing from './pages/Pricing'

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/generate" element={<Generate />} />
        <Route path="/pricing" element={<Pricing />} />
      </Routes>
    </div>
  )
}

export default App
