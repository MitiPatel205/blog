import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../utils/api";

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    api.get(`/posts/${id}`).then((res) => setPost(res.data));
  }, [id]);

  const handleComment = async (e) => {
    e.preventDefault();
    try {
      await api.post(`/posts/${id}/comments`, { content: comment });
      setComment("");
      const res = await api.get(`/posts/${id}`);
      setPost(res.data);
    } catch {
      setError("Failed to add comment.");
    }
  };

  const handleLike = async () => {
    await api.post(`/posts/${id}/like`);
    const res = await api.get(`/posts/${id}`);
    setPost(res.data);
  };

  if (!post) return <div>Loading...</div>;

  return (
    <div className="post-detail">
      <h2>{post.title}</h2>
      <p dangerouslySetInnerHTML={{ __html: post.content }} />
      <button onClick={handleLike}>
        {post.likes.length} {post.likes.length === 1 ? "Like" : "Likes"}
      </button>
      <h3>Comments</h3>
      <form onSubmit={handleComment}>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Add a comment"
        />
        <button type="submit">Add Comment</button>
        {error && <div className="error">{error}</div>}
      </form>
      {post.comments.map((c) => (
        <div key={c.id} className="comment">
          <b>{c.author.username}</b>: {c.content}
        </div>
      ))}
    </div>
  );
};

export default PostDetail;
