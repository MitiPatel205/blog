import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../utils/api";

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    api.get("/posts").then((res) => setPosts(res.data));
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    const res = await api.get(`/posts?search=${query}`);
    setPosts(res.data);
  };

  return (
    <div>
      <h2>All Posts</h2>
      <form onSubmit={handleSearch}>
        <input
          placeholder="Search posts..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      <Link to="/posts/new">+ Create Post</Link>
      {posts.map((post) => (
        <div key={post.id} className="post-card">
          <Link to={`/posts/${post.id}`}>
            <h3>{post.title}</h3>
            <p>By {post.author.username}</p>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default PostList;
