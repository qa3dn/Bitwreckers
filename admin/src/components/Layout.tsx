import { Link, NavLink } from 'react-router-dom'
import '../styles.css'

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="layout">
      <aside className="sidebar">
        <div className="logo">Bitwreckers Admin</div>
        <nav className="nav">
          <NavLink to="/" end>Dashboard</NavLink>
          <NavLink to="/pages/new">Create Page</NavLink>
          <NavLink to="/media">Media Library</NavLink>
          <NavLink to="/navigation">Navigation</NavLink>
          <NavLink to="/settings">Settings</NavLink>
          <div style={{ margin: '10px 8px', opacity: 0.7, fontSize: 12 }}>Site Pages</div>
          <NavLink to="/solutions">Solutions</NavLink>
          <NavLink to="/services">Services</NavLink>
          <NavLink to="/students">Students</NavLink>
          <NavLink to="/products">Products</NavLink>
        </nav>
      </aside>
      <header className="topbar">
        <div>Control Center</div>
        <div style={{ display: 'flex', gap: 8 }}>
          <Link to="/login" className="btn secondary">Login</Link>
        </div>
      </header>
      <main className="content">{children}</main>
    </div>
  )
}


