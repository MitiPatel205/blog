import React, { useState, useEffect } from 'react';
import '../theme.css';
import heroVideo from '../assets/hero-bg.mp4'; // Adjust the path if needed

// Keep this in sync with your Blog.jsx
const CATEGORIES = [
  "All",
  "Web Development",
  "AI",
  "Career",
  "Travel",
  "Productivity",
  "Design",
  "General",
  "Acadamic"
];

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [categories, setCategories] = useState([]);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  // Fetch all posts from backend
  useEffect(() => {
    fetch('http://localhost:5050/api/posts')
      .then(res => res.json())
      .then(data => setPosts(data))
      .catch(() => setPosts([]));
  }, []);

  // Generate categories from posts and CATEGORIES array
  useEffect(() => {
    // Count posts per category
    const catCount = {};
    posts.forEach(post => {
      const cat = post.category || "General";
      catCount[cat] = (catCount[cat] || 0) + 1;
    });
    // Build categories array in the same order as CATEGORIES (skip "All")
    const cats = CATEGORIES.filter(cat => cat !== "All").map((cat, idx) => ({
      id: idx + 1,
      name: cat,
      count: catCount[cat] || 0
    }));
    setCategories(cats);
  }, [posts]);

  // Fetch testimonials (static fallback)
  useEffect(() => {
    fetch('/api/testimonials')
      .then(res => res.json())
      .then(data => setTestimonials(data))
      .catch(() => setTestimonials([
        {
          quote: "This blog helped me land my first job as a developer!",
          author: "Priya, Frontend Developer"
        },
        {
          quote: "Clear explanations and practical examples. Highly recommended!",
          author: "Raj, Fullstack Developer"
        }
      ]));
  }, []);

  // Auto-rotate testimonials
  useEffect(() => {
    if (testimonials.length === 0) return;
    const interval = setInterval(() => {
      setCurrentTestimonial(prev => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials]);

  // Show only the latest 9 posts on Home
  const latestPosts = posts.slice(0, 8);

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <video autoPlay loop muted className="hero-video">
          <source src={heroVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="hero-content">
          <h1>Welcome to My Blog</h1>
          <p className="subtitle">
            Discover the latest posts, tutorials, and insights for developers.
          </p>
          <div className="hero-buttons">
            <a href="/blog" className="hero-button">Explore Posts</a>
            <a href="/register" className="hero-button outlined">Join Now</a>
          </div>
        </div>
      </section>

      {/* Blog Cards Section */}
      <section className="container featured-posts">
        <h2>Latest Blog Posts</h2>
        <div className="posts-grid">
          {latestPosts.length === 0 ? (
            <p>No posts available.</p>
          ) : (
            latestPosts.map(post => (
              <div className="post-card" key={post._id}>
                <span className="post-category">{post.category || "General"}</span>
                <h3>{post.title}</h3>
                <p>
                  {post.desc
                    ? post.desc
                    : typeof post.content === "string"
                      ? post.content.replace(/<[^>]+>/g, '').slice(0, 120) + "..."
                      : ""}
                </p>
                <a href={`/blog/${post._id}`} className="read-more">Read More</a>
              </div>
            ))
          )}
        </div>
        {/* Show "See All Posts" button only if there are more than 9 posts */}
        {posts.length > 8 && (
          <div className="see-all-posts">
            <a href="/blog" className="see-all-btn">See All Posts</a>
          </div>
        )}
      </section>

      {/* Popular Categories */}
      <section className="categories">
        <h2>Popular Categories</h2>
        <div className="category-grid">
          {categories.length === 0 ? (
            <p>No categories found.</p>
          ) : (
            categories.map(cat => (
              <a href={`/category/${cat.name.toLowerCase()}`} className="category-card" key={cat.id}>
                <span>{cat.name}</span>
                <small>{cat.count} posts</small>
              </a>
            ))
          )}
        </div>
      </section>

      {/* Testimonials Carousel */}
      <section className="testimonials">
        <h2>What Our Readers Say</h2>
        <div className="testimonial-carousel">
          <div className="testimonial-slides">
            {testimonials.map((testimonial, index) => (
              <div
                className={`testimonial-slide ${index === currentTestimonial ? 'active' : ''}`}
                key={index}
              >
                <p>"{testimonial.quote}"</p>
                <span>- {testimonial.author}</span>
              </div>
            ))}
          </div>
          <div className="testimonial-dots">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`dot ${index === currentTestimonial ? 'active' : ''}`}
                onClick={() => setCurrentTestimonial(index)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="newsletter">
        <h2>Stay Updated</h2>
        <p>Subscribe to our newsletter for the latest posts and tips.</p>
        <form className="newsletter-form">
          <input type="email" placeholder="Your email" required />
          <button type="submit" className="newsletter-button">Subscribe</button>
        </form>
      </section>

      {/* Social Media Links */}
      <section className="social-links">
        <h2>Follow Us</h2>
        <div className="social-icons">
          <a href="https://twitter.com" aria-label="Twitter">
            <span className="icon">🐦</span>
          </a>
          <a href="https://github.com" aria-label="GitHub">
            <span className="icon">💻</span>
          </a>
          <a href="https://linkedin.com" aria-label="LinkedIn">
            <span className="icon">🔗</span>
          </a>
        </div>
      </section>

      {/* About Section */}
      <section className="about-section">
        <h2>About Us</h2>
        <p>
          We are passionate about sharing knowledge and helping you grow as a developer.
          Join our community and never miss an update!
        </p>
        <p>
          Our blog covers a wide range of topics, from beginner tutorials to advanced
          concepts, and everything in between. Whether you're a student, a professional,
          or just curious about tech, you'll find something for you here.
        </p>
        <div className="about-buttons">
          <a href="/about" className="about-btn">Learn More</a>
        </div>
      </section>
{/* Featured Tools Section */}
<section className="featured-tools">
  <h2>Featured Tools</h2>
  <div className="tools-grid">
    <a href="https://react.dev/" target="_blank" rel="noopener noreferrer" className="tool-card">
      <span>⚛️ React Docs</span>
      <small>Official documentation for React</small>
    </a>
    <a href="https://developer.mozilla.org/" target="_blank" rel="noopener noreferrer" className="tool-card">
      <span>🌐 MDN Web Docs</span>
      <small>Best resource for HTML, CSS, JS</small>
    </a>
    <a href="https://github.com/" target="_blank" rel="noopener noreferrer" className="tool-card">
      <span>🐙 GitHub</span>
      <small>Host and share your code</small>
    </a>
  </div>
</section>
{/* Fun Facts Section */}
<section className="fun-facts">
  <h2>Did You Know?</h2>
  <ul>
    <li>🚀 This blog has readers from over 30 countries!</li>
    <li>📝 We publish new articles every week.</li>
    <li>💡 You can suggest topics via our Contact page.</li>
  </ul>
</section>

      {/* Call to Action */}
      <section className="cta">
        <h2>Ready to Dive In?</h2>
        <a href="/register" className="cta-button">Join Now</a>
      </section>
    </div>
  );
};

export default Home;
