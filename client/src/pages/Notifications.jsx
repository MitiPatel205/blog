import React, { useEffect, useState } from "react";
import api from "../utils/api";
import "../theme.css";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Replace with your actual API endpoint if different
    api.get("/api/notifications")
      .then(res => setNotifications(res.data))
      .catch(() => setNotifications([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="notifications-page">
      <h2>Notifications</h2>
      {loading ? (
        <p>Loading...</p>
      ) : notifications.length === 0 ? (
        <p>No notifications yet.</p>
      ) : (
        <ul className="notifications-list">
          {notifications.map((n, idx) => (
            <li key={n._id || idx} className={n.read ? "read" : "unread"}>
              <span>{n.message}</span>
              <small>{n.date ? new Date(n.date).toLocaleString() : ""}</small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Notifications;
