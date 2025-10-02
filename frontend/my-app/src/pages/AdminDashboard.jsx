// "use client"
/*  Simple, clean React Admin Dashboard
    - No Next.js UI libs, no TypeScript, no shadcn
    - Uses fetch (no axios)
    - CRUD against http://localhost:5000/api/posts with Bearer token from localStorage
*/

import { useEffect, useMemo, useState } from "react"
import "./admin-dashboard.css"

const API_BASE = "http://localhost:5000/api/posts"

function getInitialTheme() {
  if (typeof window === "undefined") return "light"
  const saved = localStorage.getItem("theme")
  if (saved === "light" || saved === "dark") return saved
  const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
  return prefersDark ? "dark" : "light"
}

export default function AdminDashboard() {
  const [posts, setPosts] = useState([])
  const [formData, setFormData] = useState({ title: "", content: "" })
  const [editingPost, setEditingPost] = useState(null)
  const [fetching, setFetching] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")
  const [theme, setTheme] = useState(getInitialTheme)

  // Apply theme
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.setAttribute("data-theme", theme)
    }
    if (typeof localStorage !== "undefined") {
      localStorage.setItem("theme", theme)
    }
  }, [theme])

  useEffect(() => {
    fetchPosts()
  }, [])

  async function fetchPosts() {
    setFetching(true)
    setError("")
    try {
      const token = localStorage.getItem("token")
      const headers = {}
      if (token) headers.Authorization = `Bearer ${token}`
      const res = await fetch(API_BASE, {
        method: "GET",
        headers,
        credentials: "include",
      })
      if (!res.ok) throw new Error(`Fetch failed: ${res.status}`)
      const data = await res.json()
      setPosts(Array.isArray(data) ? data : [])
    } catch (err) {
      console.error("Error fetching posts:", err)
      setError("Unable to fetch posts. Make sure your API is running at http://localhost:5000.")
    } finally {
      setFetching(false)
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setSaving(true)
    setError("")
    try {
      const token = localStorage.getItem("token")
      const headers = { "Content-Type": "application/json" }
      if (token) headers.Authorization = `Bearer ${token}`
      const url = editingPost ? `${API_BASE}/${editingPost._id}` : API_BASE
      const method = editingPost ? "PUT" : "POST"

      const res = await fetch(url, {
        method,
        headers,
        body: JSON.stringify(formData),
      })
      if (!res.ok) throw new Error(`Save failed: ${res.status}`)

      setFormData({ title: "", content: "" })
      setEditingPost(null)
      await fetchPosts()
    } catch (err) {
      console.error("Error saving post:", err)
      setError("Unable to save the post. Check your API and auth token.")
    } finally {
      setSaving(false)
    }
  }

  function handleEdit(post) {
    setEditingPost(post)
    setFormData({ title: post.title || "", content: post.content || "" })
  }

  async function handleDelete(id) {
    if (!window.confirm("Are you sure you want to delete this post?")) return
    setError("")
    try {
      const token = localStorage.getItem("token")
      const headers = {}
      if (token) headers.Authorization = `Bearer ${token}`
      const res = await fetch(`${API_BASE}/${id}`, { method: "DELETE", headers })
      if (!res.ok) throw new Error(`Delete failed: ${res.status}`)
      await fetchPosts()
    } catch (err) {
      console.error("Error deleting post:", err)
      setError("Unable to delete the post. Check your API and auth token.")
    }
  }

  function handleCancel() {
    setEditingPost(null)
    setFormData({ title: "", content: "" })
  }

  function handleTextareaKeyDown(e) {
    if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
      e.preventDefault()
      if (!saving) handleSubmit(e)
    }
  }

  function toggleTheme() {
    setTheme((t) => (t === "light" ? "dark" : "light"))
  }

  const postCountLabel = useMemo(() => `${posts.length} ${posts.length === 1 ? "post" : "posts"}`, [posts.length])

  return (
    <main className="admin-wrap" aria-busy={fetching || saving}>
      <header className="admin-header">
        <div className="title-wrap">
          <h1 className="title text-balance">Admin Dashboard</h1>
          <p className="subtitle">Manage your content and monitor performance</p>
        </div>

        <div className="header-tools">
          <span className="pill" aria-live="polite">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>
            </svg>
            {postCountLabel}
          </span>
          <button
            type="button"
            className="theme-toggle"
            onClick={toggleTheme}
            aria-pressed={theme === "dark"}
            title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          >
            {theme === "dark" ? (
              <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  fill="currentColor"
                  d="M12 18a6 6 0 1 0 0-12a6 6 0 0 0 0 12m0 4a1 1 0 0 1-1-1v-1a1 1 0 1 1 2 0v1a1 1 0 0 1-1 1m0-18a1 1 0 0 1-1-1V2a1 1 0 1 1 2 0v1a1 1 0 0 1-1 1M4 13H3a1 1 0 1 1 0-2h1a1 1 0 1 1 0 2m17 0h-1a1 1 0 1 1 0-2h1a1 1 0 1 1 0 2M6.22 19.78a1 1 0 0 1-1.41 0a1 1 0 0 1 0-1.41l.7-.7a1 1 0 0 1 1.41 1.41zm12-12a1 1 0 0 1-1.41-1.41l.7-.7a1 1 0 0 1 1.41 1.41zM5.51 6.22l-.7-.7A1 1 0 0 1 6.22 4.1l.7.7A1 1 0 0 1 5.51 6.22m11.27 11.27l.7.7a1 1 0 1 1-1.41 1.41l-.7-.7a1 1 0 1 1 1.41-1.41"
                />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  fill="currentColor"
                  d="M12 2a1 1 0 0 1 .9.56A8 8 0 1 0 21.44 11a1 1 0 0 1 1.82-.65A10 10 0 1 1 11.35 1.18A1 1 0 0 1 12 2"
                />
              </svg>
            )}
            <span className="sr-only">Toggle theme</span>
          </button>
        </div>
      </header>

      {/* Analytics Cards */}
      <section className="analytics-grid">
        <div className="analytics-card">
          <div className="analytics-header">
            <h3 className="analytics-title">Total Posts</h3>
            <div className="analytics-icon" style={{background: 'linear-gradient(135deg, #00d4ff, #8b5cf6)'}}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>
              </svg>
            </div>
          </div>
          <div className="analytics-value">{posts.length}</div>
          <div className="analytics-change positive">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M7 14l5-5 5 5z"/>
            </svg>
            +12% from last month
          </div>
        </div>

        <div className="analytics-card">
          <div className="analytics-header">
            <h3 className="analytics-title">Active Users</h3>
            <div className="analytics-icon" style={{background: 'linear-gradient(135deg, #8b5cf6, #f472b6)'}}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zM4 18v-4h3v4H4zM1 18v-4h3v4H1zm6 0v-7h3v7H7zm6 0v-5h3v5h-3z"/>
              </svg>
            </div>
          </div>
          <div className="analytics-value">1.2k</div>
          <div className="analytics-change positive">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M7 14l5-5 5 5z"/>
            </svg>
            +8% from last week
          </div>
        </div>

        <div className="analytics-card">
          <div className="analytics-header">
            <h3 className="analytics-title">Total Views</h3>
            <div className="analytics-icon" style={{background: 'linear-gradient(135deg, #06b6d4, #00d4ff)'}}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
              </svg>
            </div>
          </div>
          <div className="analytics-value">24.5k</div>
          <div className="analytics-change positive">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M7 14l5-5 5 5z"/>
            </svg>
            +15% from last month
          </div>
        </div>

        <div className="analytics-card">
          <div className="analytics-header">
            <h3 className="analytics-title">Engagement</h3>
            <div className="analytics-icon" style={{background: 'linear-gradient(135deg, #f472b6, #ef4444)'}}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
            </div>
          </div>
          <div className="analytics-value">89%</div>
          <div className="analytics-change neutral">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8.5 12L12 8.5 15.5 12 12 15.5z"/>
            </svg>
            No change
          </div>
        </div>
      </section>

      {error ? (
        <div className="alert alert-error" role="alert">
          {error}
        </div>
      ) : null}

      <section className="card">
        <div className="card-header">
          <h2 className="card-title">{editingPost ? "Edit Post" : "Create New Post"}</h2>
          <p className="card-desc">{editingPost ? "Update the selected post." : "Publish a new post to your blog."}</p>
        </div>

        <div className="card-body">
          <form onSubmit={handleSubmit} className="form-grid">
            <div className="field">
              <label htmlFor="title" className="label">
                Title
              </label>
              <input
                id="title"
                type="text"
                className="input"
                placeholder="Post Title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>

            <div className="field">
              <label htmlFor="content" className="label">
                Content
              </label>
              <textarea
                id="content"
                className="textarea"
                placeholder="Write your content..."
                rows={8}
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                onKeyDown={handleTextareaKeyDown}
                required
              />
              <div className="hint">Tip: Press Ctrl/Cmd + Enter to submit</div>
            </div>

            <div className="actions">
              <button type="submit" className="btn btn-primary" disabled={saving}>
                {saving ? "Saving..." : editingPost ? "Update Post" : "Create Post"}
              </button>
              {editingPost && (
                <button type="button" className="btn btn-ghost" onClick={handleCancel} disabled={saving}>
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>
      </section>

      <section className="list-wrap">
        <div className="list-header">
          <h2 className="section-title">Manage Posts</h2>
          <button className="btn btn-outline" onClick={fetchPosts} disabled={fetching}>
            {fetching ? "Refreshing..." : "Refresh"}
          </button>
        </div>

        <div className="grid">
          {posts.map((post) => (
            <article key={post._id} className="post-card">
              <h3 className="post-title">{post.title}</h3>
              <p className="post-excerpt">
                {(post.content || "").length > 140 ? `${post.content.substring(0, 140)}...` : post.content}
              </p>
              <div className="post-actions">
                <button className="btn btn-small" onClick={() => handleEdit(post)}>
                  Edit
                </button>
                <button className="btn btn-small btn-danger" onClick={() => handleDelete(post._id)}>
                  Delete
                </button>
              </div>
            </article>
          ))}

          {!fetching && posts.length === 0 && (
            <div className="empty">
              <p>No posts yet. Create your first post above.</p>
            </div>
          )}
        </div>
      </section>

      {(fetching || saving) && <div className="topbar" aria-hidden="true" />}
    </main>
  )
}
