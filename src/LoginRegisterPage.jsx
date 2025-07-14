import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from './supabaseClient'
import './assets/auth.css'

export default function LoginRegisterPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const navigate = useNavigate()

  const handleLogin = async () => {
    if (!email.trim() || !password) {
      setMessage('Please enter both email and password')
      return
    }
    setLoading(true)
    setMessage('')
    const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password })
    setLoading(false)
    if (error) {
      if (error.status === 400) {
        setMessage('Invalid login credentials')
      } else {
        setMessage(error.message)
      }
    } else {
      navigate('/dashboard')
    }
  }

  const handleRegister = async () => {
    if (!email.trim() || !password) {
      setMessage('Please enter both email and password')
      return
    }
    setLoading(true)
    setMessage('')
    const { error } = await supabase.auth.signUp({ email: email.trim(), password })
    setLoading(false)
    if (error) {
      if (error.status === 400) {
        setMessage('Unable to register with provided credentials')
      } else {
        setMessage(error.message)
      }
    } else {
      navigate('/dashboard')
    }
  }

  return (
    <div className="auth-form">
      <h2>Login / Register</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin} disabled={loading}>
        {loading ? '...' : 'Login'}
      </button>
      <button onClick={handleRegister} disabled={loading} style={{ marginTop: '1rem' }}>
        {loading ? '...' : 'Register'}
      </button>
      {message && <p className="message">{message}</p>}
    </div>
  )
}
