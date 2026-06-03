import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./AboutPage.css";

export default function AboutPage() {
  return (
    <div className="about-container">
      <Navbar />
      <div className="about-content animate-fade-in">
        <h1 className="gradient-text">About NeoYatra</h1>
        <div className="glass-panel about-card">
          <p className="about-lead">
            Welcome to NeoYatra, your premium travel companion for seamless bus journeys.
          </p>
          <div className="about-grid">
            <div className="about-item">
              <i className="fas fa-rocket about-icon"></i>
              <h3>Our Mission</h3>
              <p>To revolutionize the bus booking experience by providing a fast, secure, and intuitive platform for travelers everywhere.</p>
            </div>
            <div className="about-item">
              <i className="fas fa-eye about-icon"></i>
              <h3>Our Vision</h3>
              <p>We envision a world where travel is accessible, comfortable, and completely hassle-free from booking to boarding.</p>
            </div>
            <div className="about-item">
              <i className="fas fa-heart about-icon"></i>
              <h3>Our Values</h3>
              <p>Customer satisfaction, transparency, and innovation are at the core of everything we build.</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
