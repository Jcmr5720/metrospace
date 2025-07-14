import { useState } from 'react'
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
    setLoading(true)
    setMessage('')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    setLoading(false)
    if (error) {
      setMessage(error.message)
    } else {
      navigate('/dashboard')
    }
  }

  const handleRegister = async () => {
    setLoading(true)
    setMessage('')
    const { error } = await supabase.auth.signUp({ email, password })
    setLoading(false)
    if (error) {
      setMessage(error.message)
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
