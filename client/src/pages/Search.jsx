import React, { useState } from "react";
import api from "../utils/api";
import "../theme.css";

const Search = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    try {
      // Replace with your backend search endpoint
      const res = await api.get(`/api/posts?search=${encodeURIComponent(query)}`);
      setResults(res.data);
    } catch {
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="search-page">
      <h2>Search Page</h2>
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search blog posts..."
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        <button type="submit" disabled={loading}>Search</button>
      </form>
      <div className="search-results">
        {loading && <p>Loading...</p>}
        {!loading && results.length === 0 && query && <p>No results found.</p>}
        {!loading && results.length > 0 && (
          <ul>
            {results.map(post => (
              <li key={post._id}>
                <a href={`/blog/${post._id}`}>{post.title}</a>
                <small> - {post.category || "General"}</small>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Search;
