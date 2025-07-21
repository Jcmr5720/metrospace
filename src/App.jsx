import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LoginRegisterPage from './LoginRegisterPage'
import DashboardPage from './DashboardPage'
import EditDiscountPage from './EditDiscountPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginRegisterPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/ventas/descuentos/editar" element={<EditDiscountPage />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
