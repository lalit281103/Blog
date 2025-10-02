"use client"

import { useState, useEffect, useCallback } from "react"
import axios from "axios"
import "./Home.css"

function Home() {
  const [posts, setPosts] = useState([])
  const [filteredPosts, setFilteredPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("newest")

  const fetchPosts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/posts")
      setPosts(response.data)
    } catch (error) {
      console.error("Error fetching posts:", error)
    } finally {
      setLoading(false)
    }
  }

  const filterAndSortPosts = useCallback(() => {
    let filtered = posts.filter(post =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.author.name.toLowerCase().includes(searchTerm.toLowerCase())
    )

    // Sort posts
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.createdAt) - new Date(a.createdAt)
        case "oldest":
          return new Date(a.createdAt) - new Date(b.createdAt)
        case "title":
          return a.title.localeCompare(b.title)
        case "author":
          return a.author.name.localeCompare(b.author.name)
        default:
          return 0
      }
    })

    setFilteredPosts(filtered)
  }, [posts, searchTerm, sortBy])

  useEffect(() => {
    fetchPosts()
  }, [])

  useEffect(() => {
    filterAndSortPosts()
  }, [posts, searchTerm, sortBy, filterAndSortPosts])

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const truncateContent = (content, maxLength = 150) => {
    if (content.length <= maxLength) return content
    return content.substring(0, maxLength) + "..."
  }

  if (loading) {
    return (
      <div className="loading animate-fade-in">
        <div className="loading-spinner"></div>
        <span>Discovering amazing posts...</span>
      </div>
    )
  }

  return (
    <div className="home animate-fade-in">
      <div className="home-hero">
        <h1>Discover Amazing Stories</h1>
        <p className="subtitle">
          Explore a world of creativity, insights, and inspiration from our community of writers
        </p>
      </div>

      <div className="home-controls">
        <div className="search-container">
          <svg className="search-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
          </svg>
          <input
            type="text"
            placeholder="Search posts, authors, or topics..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input focus-ring"
          />
        </div>
        
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="filter-select focus-ring"
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="title">By Title</option>
          <option value="author">By Author</option>
        </select>
      </div>

      {filteredPosts.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="white">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
          </div>
          <h3>No Posts Found</h3>
          <p>
            {searchTerm 
              ? `No posts match your search for "${searchTerm}". Try a different search term.`
              : "No posts available yet. Be the first to share your story!"
            }
          </p>
        </div>
      ) : (
        <div className="posts-container">
          {filteredPosts.map((post, index) => (
            <article key={post._id} className="post-card hover-lift">
              <h2>{post.title}</h2>
              <p className="post-content">{truncateContent(post.content)}</p>
              <div className="post-meta">
                <span>By {post.author.name}</span>
                <span>{formatDate(post.createdAt)}</span>
              </div>
              <div className="post-actions">
                <button className="action-btn" title="Like post">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                  </svg>
                </button>
                <button className="action-btn" title="Share post">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"/>
                  </svg>
                </button>
                <button className="action-btn" title="Bookmark post">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2z"/>
                  </svg>
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  )
}

export default Home
