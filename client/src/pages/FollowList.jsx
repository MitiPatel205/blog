import React, { useEffect, useState } from "react";
import api from "../utils/api";

const FollowList = () => {
  const [following, setFollowing] = useState([]);
  const [followers, setFollowers] = useState([]);

  useEffect(() => {
    api.get("/users/me/following").then((res) => setFollowing(res.data));
    api.get("/users/me/followers").then((res) => setFollowers(res.data));
  }, []);

  return (
    <div>
      <h3>Following</h3>
      <ul>
        {following.map((user) => (
          <li key={user.id}>{user.username}</li>
        ))}
      </ul>
      <h3>Followers</h3>
      <ul>
        {followers.map((user) => (
          <li key={user.id}>{user.username}</li>
        ))}
      </ul>
    </div>
  );
};

export default FollowList;
