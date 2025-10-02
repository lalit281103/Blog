"use client"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import "./Navbar.css"

function Navbar({ user, logout }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [theme, setTheme] = useState('light')
  const [isScrolled, setIsScrolled] = useState(false)

  // Theme management
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
    setTheme(savedTheme)
    document.documentElement.setAttribute('data-theme', savedTheme)
  }, [])

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    document.documentElement.setAttribute('data-theme', newTheme)
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''} animate-fade-in`}>
      <div className="nav-container">
        <Link to="/" className="nav-logo hover-lift">
          NeoPost
        </Link>
        
        <div className={`nav-menu ${isMenuOpen ? 'mobile-open' : ''}`}>
          <Link to="/" className="nav-link hover-lift" onClick={closeMenu}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2.1L1 12h3v9h6v-6h4v6h6v-9h3L12 2.1z"/>
            </svg>
            Home
          </Link>
          
          {user ? (
            <>
              <span className="nav-link user-greeting">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
                Hello, {user.name}
              </span>
              
              {user.role === "admin" && (
                <Link to="/admin" className="nav-link admin-link hover-lift" onClick={closeMenu}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                  Admin
                </Link>
              )}
              
              <button onClick={() => { logout(); closeMenu(); }} className="logout-btn hover-lift">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.59L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"/>
                </svg>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link hover-lift" onClick={closeMenu}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M11 7L9.6 8.4l2.6 2.6H2v2h10.2l-2.6 2.6L11 17l5-5-5-5zm9 12h-8v2h8c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-8v2h8v14z"/>
                </svg>
                Login
              </Link>
              
              <Link to="/signup" className="nav-link hover-lift" onClick={closeMenu}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm-9-2V8c0-.55-.45-1-1-1s-1 .45-1 1v2H2c-.55 0-1 .45-1 1s.45 1 1 1h2v2c0 .55.45 1 1 1s1-.45 1-1v-2h2c.55 0 1-.45 1-1s-.45-1-1-1H6zm9 4c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
                Signup
              </Link>
            </>
          )}
          
          <button onClick={toggleTheme} className="theme-toggle hover-lift" title="Toggle theme">
            {theme === 'dark' ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 18a6 6 0 1 0 0-12a6 6 0 0 0 0 12m0 4a1 1 0 0 1-1-1v-1a1 1 0 1 1 2 0v1a1 1 0 0 1-1 1m0-18a1 1 0 0 1-1-1V2a1 1 0 1 1 2 0v1a1 1 0 0 1-1 1M4 13H3a1 1 0 1 1 0-2h1a1 1 0 1 1 0 2m17 0h-1a1 1 0 1 1 0-2h1a1 1 0 1 1 0 2M6.22 19.78a1 1 0 0 1-1.41 0a1 1 0 0 1 0-1.41l.7-.7a1 1 0 0 1 1.41 1.41zm12-12a1 1 0 0 1-1.41-1.41l.7-.7a1 1 0 0 1 1.41 1.41zM5.51 6.22l-.7-.7A1 1 0 0 1 6.22 4.1l.7.7A1 1 0 0 1 5.51 6.22m11.27 11.27l.7.7a1 1 0 1 1-1.41 1.41l-.7-.7a1 1 0 1 1 1.41-1.41"/>
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2a1 1 0 0 1 .9.56A8 8 0 1 0 21.44 11a1 1 0 0 1 1.82-.65A10 10 0 1 1 11.35 1.18A1 1 0 0 1 12 2"/>
              </svg>
            )}
          </button>
        </div>
        
        <button 
          className={`nav-toggle ${isMenuOpen ? 'active' : ''}`} 
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  )
}

export default Navbar
