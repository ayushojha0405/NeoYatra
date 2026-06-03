import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./AboutPage.css";

export default function TermsPage() {
  return (
    <div className="about-container">
      <Navbar />
      <div className="about-hero animate-fade-in">
        <h1 className="gradient-text">Terms of Service</h1>
        <p>Please read these terms carefully before using our services.</p>
      </div>
      <div className="about-content section-container">
        <div className="glass-panel" style={{ padding: '3rem' }}>
          <h2>1. Acceptance of Terms</h2>
          <p>By accessing and using NeoYatra, you accept and agree to be bound by the terms and provision of this agreement.</p>
          <br/>
          <h2>2. Service Description</h2>
          <p>NeoYatra provides an online bus ticket booking platform. We do not operate any bus services ourselves; we act as a bridge between users and bus operators.</p>
          <br/>
          <h2>3. User Responsibilities</h2>
          <p>Users are responsible for providing accurate information during booking and carrying valid ID proof during the journey.</p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
