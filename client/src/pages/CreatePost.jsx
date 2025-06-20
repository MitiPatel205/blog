import React from 'react';

export default function CreatePost() {
  return (
    <div className="container">
      <h1>Create a New Post</h1>
      <form>
        <input type="text" placeholder="Title" required />
        <textarea placeholder="Content" required></textarea>
        <button type="submit">Publish</button>
      </form>
    </div>
  );
}
