import React, { useEffect, useState } from "react";
import api from "../utils/api";
import '../theme.css';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("users");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersRes, postsRes] = await Promise.all([
          api.get("/admin/users"),
          api.get("/admin/posts"),
        ]);
        setUsers(usersRes.data);
        setPosts(postsRes.data);
      } catch (err) {
        setError("Failed to load admin data.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleDeleteUser = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await api.delete(`/admin/users/${userId}`);
      setUsers(users.filter((u) => u._id !== userId));
    } catch {
      alert("Failed to delete user.");
    }
  };

  const handleDeletePost = async (postId) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    try {
      await api.delete(`/admin/posts/${postId}`);
      setPosts(posts.filter((p) => p._id !== postId));
    } catch {
      alert("Failed to delete post.");
    }
  };

  if (loading) return <div>Loading admin dashboard...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>
      <div className="admin-tabs">
        <button onClick={() => setTab("users")} className={tab === "users" ? "active" : ""}>
          Users
        </button>
        <button onClick={() => setTab("posts")} className={tab === "posts" ? "active" : ""}>
          Posts
        </button>
      </div>

      {tab === "users" && (
        <div>
          <h3>Users ({users.length})</h3>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Username</th>
                <th>Email</th>
                <th>Role</th>
                <th>Joined</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u._id}>
                  <td>{u._id}</td>
                  <td>{u.username}</td>
                  <td>{u.email}</td>
                  <td>{u.role || "user"}</td>
                  <td>{u.createdAt ? new Date(u.createdAt).toLocaleDateString() : "N/A"}</td>
                  <td>
                    <button onClick={() => handleDeleteUser(u._id)} className="danger">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab === "posts" && (
        <div>
          <h3>Posts ({posts.length})</h3>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Author</th>
                <th>Created</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((p) => (
                <tr key={p._id}>
                  <td>{p._id}</td>
                  <td>{p.title}</td>
                  <td>{p.author?.username || "N/A"}</td>
                  <td>{p.createdAt ? new Date(p.createdAt).toLocaleDateString() : "N/A"}</td>
                  <td>
                    <button onClick={() => handleDeletePost(p._id)} className="danger">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
