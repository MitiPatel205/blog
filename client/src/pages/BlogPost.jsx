import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import '../theme.css';

const BlogPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5050/api/posts/${id}`)
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch post");
        return res.json();
      })
      .then(data => {
        setPost(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Post not found.");
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="container"><p>Loading...</p></div>;
  if (error || !post) return <div className="container"><p>{error || "Post not found."}</p></div>;

  return (
    <div className="container blog-post-page">
      <nav className="blogpost-breadcrumb">
        <Link to="/blog" className="breadcrumb-link">← Back to Blog</Link>
      </nav>

      <div className="blogpost-header">
        <span className={`post-category cat-${(post.category || "General").replace(/\s/g, '').toLowerCase()}`}>
          {post.category || "General"}
        </span>
        <h1 className="blogpost-title">{post.title}</h1>
        <div className="post-meta">
          <span>
            <strong>By:</strong> {post.author || "Guest"}
          </span>
          <span>
            <strong>Published:</strong> {post.createdAt ? new Date(post.createdAt).toLocaleDateString() : ""}
          </span>
        </div>
      </div>

      <div className="blogpost-content">
        {post.content
          ? <div dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, "<br/>") }} />
          : <p>{post.desc || "No content available."}</p>
        }
      </div>

      {/* Example: Related Posts or Tags (optional) */}
      {/* <div className="related-posts">
        <h3>Related Posts</h3>
        <ul>
          <li><Link to="/blog/123">Another interesting post</Link></li>
        </ul>
      </div> */}
    </div>
  );
};

export default BlogPost;
