import React from 'react';

export default function EditPost() {
  return (
    <div className="container">
      <h1>Edit Post</h1>
      <form>
        <input type="text" defaultValue="Post Title" required />
        <textarea defaultValue="Post content goes here..." required></textarea>
        <button type="submit">Update</button>
      </form>
    </div>
  );
}
