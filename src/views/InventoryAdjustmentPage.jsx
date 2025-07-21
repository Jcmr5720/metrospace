import React, { useEffect, useState } from 'react'
import { supabase } from '../supabaseClient'

export default function InventoryAdjustmentPage() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    loadProducts()
  }, [])

  async function loadProducts() {
    const { data } = await supabase
      .from('products')
      .select('id, title, cantidad, producto_almacen(location)')
    const formatted = (data || []).map((p) => ({
      id: p.id,
      title: p.title,
      cantidad: p.cantidad,
      location: p.producto_almacen?.location || '',
      nueva: ''
    }))
    setProducts(formatted)
  }

  const handleChange = (index, value) => {
    const list = [...products]
    const qty = Number(value)
    if (qty > list[index].cantidad) return
    list[index].nueva = value
    setProducts(list)
  }

  async function save(index) {
    const item = products[index]
    const nuevaCantidad = Number(item.nueva)
    if (isNaN(nuevaCantidad)) return
    setLoading(true)
    await supabase.from('products').update({ cantidad: nuevaCantidad }).eq('id', item.id)

    const { data: histRow } = await supabase
      .from('producto_cantidad')
      .select('id, historico')
      .eq('product_id', item.id)
      .single()

    const nuevoHist = (histRow?.historico || [])
    nuevoHist.push({ fecha: new Date().toISOString(), cantidad_nueva: nuevaCantidad })

    if (histRow) {
      await supabase
        .from('producto_cantidad')
        .update({ historico: nuevoHist })
        .eq('product_id', item.id)
    } else {
      await supabase
        .from('producto_cantidad')
        .insert({ product_id: item.id, historico: nuevoHist })
    }

    const list = [...products]
    list[index].cantidad = nuevaCantidad
    list[index].nueva = ''
    setProducts(list)
    setLoading(false)
  }

  return (
    <div>
      <h2>Ajuste de Inventario</h2>
      <table>
        <thead>
          <tr>
            <th>Producto</th>
            <th>Cantidad</th>
            <th>Ubicación</th>
            <th>Nueva cantidad</th>
            <th>Historial</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p, idx) => (
            <tr key={p.id}>
              <td>{p.title}</td>
              <td>{p.cantidad}</td>
              <td>{p.location}</td>
              <td>
                <input
                  type="number"
                  value={p.nueva}
                  onChange={(e) => handleChange(idx, e.target.value)}
                  max={p.cantidad}
                  min={0}
                />
              </td>
              <td>
                <button onClick={() => save(idx)} disabled={loading || p.nueva === ''}>Guardar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
