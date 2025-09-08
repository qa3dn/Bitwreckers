import { useState } from 'react'
import { apiFetch, setAccessToken } from '../lib/api'
import { useNavigate } from 'react-router-dom'

type TokenResponse = { access_token: string; refresh_token?: string }

export function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    try {
      const res = await apiFetch<TokenResponse>('/auth/login', { method: 'POST', body: { email, password } })
      setAccessToken(res.access_token)
      navigate('/')
    } catch (e: any) {
      setError(e.message)
    }
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <form onSubmit={onSubmit} style={{ width: 360, border: '1px solid #e5e7eb', padding: 24, borderRadius: 8 }}>
        <h1 style={{ fontSize: 20, fontWeight: 600, marginBottom: 16 }}>Admin Login</h1>
        <label>Email</label>
        <input style={{ width: '100%', padding: 8, marginBottom: 12 }} value={email} onChange={(e) => setEmail(e.target.value)} />
        <label>Password</label>
        <input type="password" style={{ width: '100%', padding: 8, marginBottom: 12 }} value={password} onChange={(e) => setPassword(e.target.value)} />
        {error && <div style={{ color: '#b91c1c', marginBottom: 12 }}>{error}</div>}
        <button type="submit" style={{ width: '100%', background: '#2563eb', color: '#fff', padding: 10, borderRadius: 6 }}>Sign in</button>
      </form>
    </div>
  )
}


