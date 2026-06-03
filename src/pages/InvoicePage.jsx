import { useLocation, useNavigate } from "react-router-dom";
import { useBooking } from "../context/BookingContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./InvoicePage.css";

const InvoicePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentBooking, resetBookingFlow } = useBooking();
  const { bookingData: stateBooking } = location.state || {};
  const bookingData = stateBooking || currentBooking;
  const trip = bookingData?.busId || bookingData?.bus;

  if (!bookingData) {
    return (
      <div className="invoice-wrapper">
        <Navbar />
        <div className="empty-state full-height">
          <i className="fas fa-file-invoice empty-icon"></i>
          <h2>No Invoice Found!</h2>
          <button className="btn-primary mt-6" onClick={() => navigate("/")}>Go Home</button>
        </div>
        <Footer />
      </div>
    );
  }

  const baseFare = bookingData.total || 0;
  
  const handlePrint = () => {
    window.print();
  };

  const handleBookAnother = () => {
    resetBookingFlow();
    navigate("/home");
  };

  return (
    <div className="invoice-wrapper">
      <Navbar />

      <div className="invoice-container animate-fade-in">
        <div className="invoice-actions no-print">
          <button className="btn-secondary" onClick={() => navigate("/home")}>
            <i className="fas fa-arrow-left"></i> Back to Home
          </button>
          <div className="action-group">
            <button className="btn-secondary" onClick={handlePrint}>
              <i className="fas fa-print"></i> Print
            </button>
            <button className="btn-primary" onClick={handlePrint}>
              <i className="fas fa-download"></i> Download PDF
            </button>
          </div>
        </div>

        <div className="invoice-document glass-panel printable-area">
          <div className="invoice-header">
            <div className="invoice-brand">
              <h2>Neo<span className="text-accent">Yatra</span></h2>
              <p>Official E-Ticket</p>
            </div>
            <div className="invoice-meta">
              <div className="meta-item">
                <span>Booking ID</span>
                <strong>{bookingData._id.toUpperCase()}</strong>
              </div>
              <div className="meta-item">
                <span>Date</span>
                <strong>{new Date(bookingData.createdAt || Date.now()).toLocaleDateString()}</strong>
              </div>
              <div className="meta-item status-confirmed">
                <span>Status</span>
                <strong><i className="fas fa-check-circle"></i> CONFIRMED</strong>
              </div>
            </div>
          </div>

          <div className="invoice-body">
            <div className="journey-card">
              <div className="journey-card-header">
                <h3>{trip?.company || 'NeoYatra Express'}</h3>
                <span>A/C Sleeper (2+1)</span>
              </div>
              
              <div className="journey-route">
                <div className="route-point">
                  <span className="time">21:00</span>
                  <span className="city">{trip?.source}</span>
                  <span className="date">{trip?.date}</span>
                </div>
                <div className="route-divider">
                  <i className="fas fa-bus text-accent"></i>
                  <div className="route-line"></div>
                </div>
                <div className="route-point">
                  <span className="time">07:30</span>
                  <span className="city">{trip?.destination}</span>
                  <span className="date">Next Day</span>
                </div>
              </div>
            </div>

            <div className="invoice-details-grid">
              <div className="passenger-details-section">
                <h4>Passenger Details</h4>
                <div className="passenger-table">
                  <div className="table-header">
                    <span>Name</span>
                    <span>Age</span>
                    <span>Gender</span>
                    <span>Seat</span>
                  </div>
                  {bookingData.passengers?.map((p, i) => (
                    <div className="table-row" key={i}>
                      <span>{p.name}</span>
                      <span>{p.age}</span>
                      <span>{p.gender}</span>
                      <span className="seat-badge-small">{bookingData.seats[i]}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="payment-details-section">
                <h4>Payment Summary</h4>
                <div className="summary-list">
                  <div className="summary-item">
                    <span>Base Fare ({bookingData.seats.length} seats)</span>
                    <span>₹ {baseFare}</span>
                  </div>
                  <div className="summary-item">
                    <span>Taxes & Fees</span>
                    <span>₹ 0</span>
                  </div>
                  <div className="summary-item">
                    <span>Discount</span>
                    <span className="text-success">- ₹ 0</span>
                  </div>
                  <div className="summary-item total-item">
                    <span>Total Paid</span>
                    <span className="text-accent">₹ {baseFare}</span>
                  </div>
                </div>
                <div className="payment-method-info">
                  Paid via Secure Gateway
                </div>
              </div>
            </div>
          </div>

          <div className="invoice-footer-notes">
            <h4>Terms & Conditions</h4>
            <ul>
              <li>Passengers must carry a valid photo ID along with this e-ticket.</li>
              <li>Please arrive at the boarding point at least 30 minutes before departure.</li>
              <li>Cancellation policies apply as per operator terms.</li>
            </ul>
            <p className="thank-you">Thank you for booking with NeoYatra!</p>
          </div>
        </div>

        <div className="invoice-bottom-actions no-print">
          <button className="btn-secondary" onClick={handleBookAnother}>
            Book Another Trip
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default InvoicePage;