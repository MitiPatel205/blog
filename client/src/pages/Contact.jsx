import React from 'react';

export default function Contact() {
  return (
    <div className="container contact-page">
      <div className="contact-card">
        <h1>Contact Us</h1>
        <p className="contact-subtitle">
          We'd love to hear from you! Fill out the form and our team will get back to you soon.
        </p>
        <form className="contact-form">
          <div className="input-group">
            <input type="text" placeholder="Your Name" required />
          </div>
          <div className="input-group">
            <input type="email" placeholder="Your Email" required />
          </div>
          <div className="input-group">
            <textarea placeholder="Your Message" required></textarea>
          </div>
          <button type="submit" className="contact-button">
            <span role="img" aria-label="send">📧</span> Send Message
          </button>
        </form>
        <div className="contact-info">
          <div>
            <span role="img" aria-label="email">✉️</span> hello@example.com
          </div>
          <div>
            <span role="img" aria-label="phone">📞</span> +1 234 567 8900
          </div>
        </div>
      </div>
    </div>
  );
}
