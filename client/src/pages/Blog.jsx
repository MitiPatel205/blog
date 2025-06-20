import React, { useEffect, useState } from 'react';
import '../theme.css';

const CATEGORIES = [
  "All",
  "Web Development",
  "AI",
  "Career",
  "Travel",
  "Productivity",
  "Design",
  "General",
  "Acadamic"
];

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [error, setError] = useState(null);

  const fetchPosts = () => {
    setLoading(true);
    setError(null);

    // Use full backend URL for development reliability
    fetch('http://localhost:5050/api/posts')
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch posts");
        return res.json();
      })
      .then(data => {
        // Accept both array and { posts: [...] } formats
        let postsArray = [];
        if (Array.isArray(data)) {
          postsArray = data;
        } else if (data && Array.isArray(data.posts)) {
          postsArray = data.posts;
        } else {
          throw new Error("Invalid data format received from API");
        }
        setPosts(postsArray.reverse());
        setLoading(false);
      })
      .catch(err => {
        setError("Could not load blog posts. Please try again.");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchPosts();
    // eslint-disable-next-line
  }, []);

  const filteredPosts = selectedCategory === "All"
    ? posts
    : posts.filter(post => (post.category || "General") === selectedCategory);

  return (
    <div className="container blog-page">
      <h1 className="blog-title">All Blog Posts</h1>
      {/* Category Filter Bar */}
      <div className="category-bar">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            className={`category-btn${selectedCategory === cat ? " active" : ""}`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>
      {loading ? (
        <div className="spinner"></div>
      ) : error ? (
        <div className="error-message">
          {error}
          <button className="retry-btn" onClick={fetchPosts}>Retry</button>
        </div>
      ) : posts.length === 0 ? (
        <div className="no-posts">No blog posts found. Be the first to post!</div>
      ) : filteredPosts.length === 0 ? (
        <div className="no-posts">No posts available in this category.</div>
      ) : (
        <div className="posts-grid">
          {filteredPosts.map(post => (
            <div className={`post-card card-${(post.category || "General").replace(/\s/g, '').toLowerCase()}`} key={post._id}>
              <span className="post-category">{post.category || "General"}</span>
              <h3>{post.title}</h3>
              <p>
                {post.desc
                  ? post.desc
                  : post.content
                    ? (typeof post.content === "string"
                        ? post.content.replace(/<[^>]+>/g, '').slice(0, 100) + "..."
                        : "")
                    : "No description available."}
              </p>
              <div className="post-meta">
                <span>By {post.author || "Guest"}</span>
                <span>{post.createdAt ? new Date(post.createdAt).toLocaleDateString() : ""}</span>
              </div>
              <a href={`/blog/${post._id}`} className="read-more">Read More</a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Blog;
