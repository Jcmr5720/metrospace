import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LoginRegisterPage from './LoginRegisterPage'
import DashboardPage from './DashboardPage'
import EditDiscountPage from './EditDiscountPage'
import MyProductsPage from './views/MyProductsPage'
import InventoryAdjustmentPage from './views/InventoryAdjustmentPage'

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginRegisterPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/ventas/descuentos/editar" element={<EditDiscountPage />} />
        <Route path="/mis-productos" element={<MyProductsPage />} />
        <Route path="/mis-productos/ajuste-inventario" element={<InventoryAdjustmentPage />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
