import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from './supabaseClient'
import './assets/dashboard.css'

export default function DashboardPage() {
  const [username, setUsername] = useState('')
  const [resources, setResources] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const load = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) {
        navigate('/login')
        return
      }

      const { data: userInfo } = await supabase
        .from('users')
        .select('username')
        .eq('supabase_auth_id', user.id)
        .single()
      setUsername(userInfo?.username || '')

      const { data: resourceInfo } = await supabase
        .from('player_resources')
        .select('*')
        .eq('player_id', user.id)
        .single()
      setResources(resourceInfo || {})
    }
    load()
  }, [navigate])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate('/login')
  }

  if (!resources) return null

  return (
    <div className="dashboard">
      <h1>Bienvenido, {username}</h1>
      <div className="resources">
        <div className="resource">Chrono-Polvo: {resources.chrono_polvo}</div>
        <div className="resource">Cristal Etéreo: {resources.cristal_etereo}</div>
        <div className="resource">Combustible de Singularidad: {resources.combustible_singularidad}</div>
        <div className="resource">Núcleos de Potencia: {resources.nucleos_potencia}</div>
        <div className="resource">Créditos Galácticos: {resources.creditos_galacticos}</div>
        <div className="resource">Sustancia X: {resources.sustancia_x}</div>
      </div>
      <button className="logout" onClick={handleLogout}>Cerrar Sesión</button>
    </div>
  )
}
