import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./AboutPage.css"; // Reuse AboutPage styles for generic content pages

export default function HelpCenterPage() {
  return (
    <div className="about-container">
      <Navbar />
      <div className="about-hero animate-fade-in">
        <h1 className="gradient-text">Help Center</h1>
        <p>How can we help you today?</p>
      </div>
      <div className="about-content section-container">
        <div className="glass-panel" style={{ padding: '3rem' }}>
          <h2>Frequently Asked Questions</h2>
          <br/>
          <h3>How do I book a ticket?</h3>
          <p>You can search for your destination on the home page, select a bus, choose your seats, and proceed to checkout.</p>
          <br/>
          <h3>Can I cancel my booking?</h3>
          <p>Yes, you can cancel your booking from the 'My Bookings' section. Cancellation fees may apply depending on the bus operator.</p>
          <br/>
          <h3>How do I get a refund?</h3>
          <p>Refunds for cancelled tickets will be processed automatically to your original payment method within 5-7 business days.</p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
