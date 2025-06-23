import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AdminDashboard() {
  const [posts, setPosts] = useState([]);
  const [formData, setFormData] = useState({ title: '', content: '' });
  const [editingPost, setEditingPost] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/posts');
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Bearer ${token}` } };

      if (editingPost) {
        await axios.put(`http://localhost:5000/api/posts/${editingPost._id}`, formData, config);
        setEditingPost(null);
      } else {
        await axios.post('http://localhost:5000/api/posts', formData, config);
      }

      setFormData({ title: '', content: '' });
      fetchPosts();
    } catch (error) {
      console.error('Error saving post:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (post) => {
    setEditingPost(post);
    setFormData({ title: post.title, content: post.content });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;

    try {
      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      await axios.delete(`http://localhost:5000/api/posts/${id}`, config);
      fetchPosts();
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const handleCancel = () => {
    setEditingPost(null);
    setFormData({ title: '', content: '' });
  };

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      
      <div className="post-form">
        <h2>{editingPost ? 'Edit Post' : 'Create New Post'}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Post Title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />
          <textarea
            placeholder="Post Content"
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            rows="6"
            required
          />
          <div className="form-buttons">
            <button type="submit" disabled={loading}>
              {loading ? 'Saving...' : (editingPost ? 'Update Post' : 'Create Post')}
            </button>
            {editingPost && (
              <button type="button" onClick={handleCancel}>Cancel</button>
            )}
          </div>
        </form>
      </div>

      <div className="posts-list">
        <h2>Manage Posts</h2>
        {posts.map(post => (
          <div key={post._id} className="admin-post-card">
            <h3>{post.title}</h3>
            <p>{post.content.substring(0, 100)}...</p>
            <div className="post-actions">
              <button onClick={() => handleEdit(post)} className="edit-btn">Edit</button>
              <button onClick={() => handleDelete(post._id)} className="delete-btn">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminDashboard;