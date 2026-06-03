import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./AboutPage.css";

export default function PrivacyPolicyPage() {
  return (
    <div className="about-container">
      <Navbar />
      <div className="about-hero animate-fade-in">
        <h1 className="gradient-text">Privacy Policy</h1>
        <p>Your privacy is important to us.</p>
      </div>
      <div className="about-content section-container">
        <div className="glass-panel" style={{ padding: '3rem' }}>
          <h2>Data Collection</h2>
          <p>We collect information you provide directly to us, such as when you create or modify your account, request on-demand services, contact customer support, or otherwise communicate with us.</p>
          <br/>
          <h2>Use of Information</h2>
          <p>We may use the information we collect about you to provide, maintain, and improve our services, including facilitating payments, sending receipts, providing products and services you request.</p>
          <br/>
          <h2>Data Security</h2>
          <p>We take reasonable measures to help protect information about you from loss, theft, misuse and unauthorized access, disclosure, alteration and destruction.</p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
