import { Link } from "react-router-dom";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-container">
          <div className="footer-brand-section">
            <Link to="/" className="footer-logo">
              Neo<span className="text-accent">Yatra</span>
            </Link>
            <p className="footer-desc">
              Revolutionizing bus travel with seamless booking, comfortable journeys, and secure payments.
            </p>
            <div className="footer-socials">
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
              <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="LinkedIn"><i className="fab fa-linkedin-in"></i></a>
            </div>
          </div>
          
          <div className="footer-links">
            <h4 className="footer-title">Quick Links</h4>
            <ul>
              <li><Link to="/home">Home</Link></li>
              <li><Link to="/tickets">Tickets</Link></li>
              <li><Link to="/bookings">My Bookings</Link></li>
              <li><Link to="/about">About Us</Link></li>
            </ul>
          </div>
          
          <div className="footer-links">
            <h4 className="footer-title">Support</h4>
            <ul>
              <li><Link to="/help">Help Center</Link></li>
              <li><Link to="/terms">Terms of Service</Link></li>
              <li><Link to="/privacy">Privacy Policy</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
            </ul>
          </div>
          
          <div className="footer-newsletter">
            <h4 className="footer-title">Newsletter</h4>
            <p>Subscribe for latest offers and updates.</p>
            <div className="newsletter-form">
              <input type="email" placeholder="Your email address" className="input-field" />
              <button className="btn-primary"><i className="fas fa-paper-plane"></i></button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <div className="footer-container bottom-container">
          <p>&copy; {new Date().getFullYear()} NeoYatra. All rights reserved.</p>
          <p className="footer-credit">Crafted with <i className="fas fa-heart text-accent"></i> by Ayush Ranjan Ojha</p>
        </div>
      </div>
    </footer>
  );
}