import React from 'react'
import { Link } from 'react-router-dom'
import '../assets/dashboard.css'

export default function MyProductsPage() {
  return (
    <div className="my-products-page" style={{ display: 'flex' }}>
      <aside className="sidebar" style={{ width: '200px', padding: '1rem', borderRight: '1px solid #ccc' }}>
        <h3>Operaciones</h3>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li>
            <Link to="/mis-productos/ajuste-inventario">Ajuste de inventario</Link>
          </li>
        </ul>
      </aside>
      <main style={{ flex: 1, padding: '1rem' }}>
        <h2>Mis Productos</h2>
        <p>Selecciona una opción del menú.</p>
      </main>
    </div>
  )
}
