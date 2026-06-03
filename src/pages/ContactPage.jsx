import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./AboutPage.css";

export default function ContactPage() {
  return (
    <div className="about-container">
      <Navbar />
      <div className="about-hero animate-fade-in">
        <h1 className="gradient-text">Contact Us</h1>
        <p>We'd love to hear from you!</p>
      </div>
      <div className="about-content section-container">
        <div className="glass-panel" style={{ padding: '3rem' }}>
          <h2>Get in Touch</h2>
          <p>If you have any questions or queries a member of staff will always be happy to help. Feel free to contact us by email or phone and we will be sure to get back to you as soon as possible.</p>
          <br/>
          <p><strong>Email:</strong> support@neoyatra.com</p>
          <p><strong>Phone:</strong> +91 1800 123 4567</p>
          <p><strong>Address:</strong> 123 Tech Park, Cyber City, Bangalore, Karnataka 560001, India</p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
