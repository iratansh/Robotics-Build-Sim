import React from 'react';
import { FaTwitter, FaFacebook, FaLinkedin, FaGithub, FaRegEnvelope } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="main-footer">
      <div className="footer-content">
        <div className="footer-section">
          <h4 className="footer-heading">Product</h4>
          <ul className="footer-links">
            <li><a href="/features">Features</a></li>
            <li><a href="/pricing">Pricing</a></li>
            <li><a href="/templates">Templates</a></li>
            <li><a href="/integrations">Integrations</a></li>
            <li><a href="/status">Status</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4 className="footer-heading">Company</h4>
          <ul className="footer-links">
            <li><a href="/about">About</a></li>
            <li><a href="/blog">Blog</a></li>
            <li><a href="/careers">Careers</a></li>
            <li><a href="/press">Press</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4 className="footer-heading">Resources</h4>
          <ul className="footer-links">
            <li><a href="/help">Help Center</a></li>
            <li><a href="/developers">Developers</a></li>
            <li><a href="/partners">Partners</a></li>
            <li><a href="/api">API Docs</a></li>
            <li><a href="/security">Security</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4 className="footer-heading">Connect With Us</h4>
          <div className="social-links">
            <a href="https://twitter.com" aria-label="Twitter"><FaTwitter /></a>
            <a href="https://facebook.com" aria-label="Facebook"><FaFacebook /></a>
            <a href="https://linkedin.com" aria-label="LinkedIn"><FaLinkedin /></a>
            <a href="https://github.com" aria-label="GitHub"><FaGithub /></a>
            <a href="mailto:contact@company.com" aria-label="Email"><FaRegEnvelope /></a>
          </div>
          
          <div className="newsletter">
            <p>Subscribe to our newsletter</p>
            <form className="newsletter-form">
              <input type="email" placeholder="Enter your email" />
              <button type="submit">Subscribe</button>
            </form>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="legal-links">
          <a href="/privacy">Privacy Policy</a>
          <a href="/terms">Terms of Service</a>
          <a href="/cookies">Cookie Settings</a>
        </div>
        <div className="copyright">
          © {new Date().getFullYear()} Logo Spark. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;