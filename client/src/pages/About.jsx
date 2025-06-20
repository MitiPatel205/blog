import React from 'react';

export default function About() {
  return (
    <div className="container about-page">
      <section className="about-hero">
        <h1>About Random Blog</h1>
        <p className="about-tagline">
          Welcome to <span className="brand-name">Random Blog</span> — your go-to place for stories, tutorials, and inspiration from creators worldwide.
        </p>
      </section>
      <section className="about-mission">
        <h2>
          <svg width="24" height="24" fill="none" viewBox="0 0 24 24" className="icon-mission"><circle cx="12" cy="12" r="10" stroke="#4a4e69" strokeWidth="2"/><path d="M12 6v6l4 2" stroke="#9a8c98" strokeWidth="2" strokeLinecap="round"/></svg>
          Our Mission
        </h2>
        <p>
          At <span className="brand-name">Random Blog</span>, we believe in sharing knowledge, sparking ideas, and building a supportive community of writers and readers. Our mission is to make blogging accessible, fun, and rewarding for everyone.
        </p>
      </section>
      <section className="about-team">
        <h2>
          <svg width="24" height="24" fill="none" viewBox="0 0 24 24" className="icon-team"><circle cx="12" cy="8" r="4" stroke="#4a4e69" strokeWidth="2"/><path d="M4 20c0-2.2 3.6-4 8-4s8 1.8 8 4" stroke="#9a8c98" strokeWidth="2"/></svg>
          Meet the Bloggers
        </h2>
        <div className="team-list">
          <div className="team-member">
            <img src="https://randomuser.me/api/portraits/men/31.jpg" alt="Team Member" />
            <h3>Chris Jordan</h3>
            <p>Editor-in-Chief</p>
          </div>
          <div className="team-member">
            <img src="https://randomuser.me/api/portraits/women/47.jpg" alt="Team Member" />
            <h3>Priya Patel</h3>
            <p>Lead Writer</p>
          </div>
          <div className="team-member">
            <img src="https://randomuser.me/api/portraits/men/77.jpg" alt="Team Member" />
            <h3>Leo Wang</h3>
            <p>Community Manager</p>
          </div>
        </div>
      </section>
    </div>
  );
}
