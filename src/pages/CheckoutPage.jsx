import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { createBooking } from "../services/bookingService";
import { useBooking } from "../context/BookingContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./CheckoutPage.css";

const CheckoutPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedBus: contextBus, selectedSeats: contextSeats, setCurrentBooking } = useBooking();
  const { selectedBus: stateBus, selectedSeats: stateSeats } = location.state || {};
  const selectedBus = stateBus || contextBus;
  const selectedSeats = stateSeats || contextSeats;

  if (!selectedBus || !selectedSeats || selectedSeats.length === 0) {
    return (
      <div className="checkout-wrapper">
        <Navbar />
        <div className="empty-state full-height">
          <i className="fas fa-ticket-alt empty-icon"></i>
          <h2>No booking details found!</h2>
          <p>Please select a bus and seats first.</p>
          <button className="btn-primary mt-6" onClick={() => navigate("/tickets")}>Go to Search</button>
        </div>
        <Footer />
      </div>
    );
  }

  const totalPrice = selectedSeats.length * selectedBus.price;

  const [passengers, setPassengers] = useState(
    selectedSeats.map(() => ({ name: "", age: "", gender: "" }))
  );
  const [applicant, setApplicant] = useState({
    email: "",
    phone: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [touched, setTouched] = useState(false);

  const handlePassengerChange = (index, field, value) => {
    const updated = [...passengers];
    updated[index][field] = value;
    setPassengers(updated);
  };

  const handleApplicantChange = (e) => {
    setApplicant({ ...applicant, [e.target.name]: e.target.value });
  };

  const handleConfirm = async (e) => {
    e.preventDefault();
    setTouched(true);
    setErrorMessage("");

    if (passengers.some((p) => !p.name || !p.age || !p.gender)) {
      setErrorMessage("Please fill all passenger details (name, age, gender).");
      return;
    }
    if (!applicant.email || !applicant.phone) {
      setErrorMessage("Please enter applicant email and phone.");
      return;
    }

    try {
      setIsSubmitting(true);
      const bookingData = {
        busId: selectedBus._id,
        seats: selectedSeats,
        passengers,
      };

      const newBooking = await createBooking(bookingData);
      setCurrentBooking(newBooking);
      navigate("/payment", { state: { bookingData: newBooking } });
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Error creating booking. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isPassengerDataValid = passengers.every((p) => p.name && p.age && p.gender);
  const isApplicantValid = applicant.email && applicant.phone;
  const isFormValid = isPassengerDataValid && isApplicantValid;

  return (
    <div className="checkout-wrapper">
      <Navbar />
      
      <div className="checkout-container animate-fade-in">
        <div className="checkout-header">
          <h1 className="gradient-text">Checkout</h1>
          <div className="checkout-steps">
            <div className="step-indicator active"><div className="step-circle">1</div> Details</div>
            <div className="step-line"></div>
            <div className="step-indicator"><div className="step-circle">2</div> Payment</div>
            <div className="step-line"></div>
            <div className="step-indicator"><div className="step-circle">3</div> Ticket</div>
          </div>
        </div>

        <div className="checkout-grid">
          {/* Form Section */}
          <div className="checkout-form-section">
            {errorMessage && <div className="error-alert"><i className="fas fa-exclamation-circle"></i> {errorMessage}</div>}
            {touched && (!isPassengerDataValid || !isApplicantValid) && (
              <div className="error-alert"><i className="fas fa-exclamation-circle"></i> Please complete all required fields.</div>
            )}
            
            <form onSubmit={handleConfirm}>
              <div className="glass-panel form-panel">
                <div className="panel-header">
                  <h3><i className="fas fa-users text-accent"></i> Passenger Details</h3>
                </div>
                
                <div className="passengers-list">
                  {selectedSeats.map((seat, index) => (
                    <div key={seat} className="passenger-card">
                      <div className="passenger-header">
                        <h4>Passenger {index + 1}</h4>
                        <span className="seat-badge">Seat {seat}</span>
                      </div>
                      
                      <div className="passenger-inputs">
                        <div className="form-group">
                          <label className="form-label">Full Name</label>
                          <input
                            type="text"
                            className="input-field"
                            placeholder="Enter full name"
                            value={passengers[index].name}
                            onChange={(e) => handlePassengerChange(index, "name", e.target.value)}
                            required
                          />
                        </div>
                        <div className="form-group-row">
                          <div className="form-group half">
                            <label className="form-label">Age</label>
                            <input
                              type="number"
                              className="input-field"
                              placeholder="Age"
                              min="1" max="120"
                              value={passengers[index].age}
                              onChange={(e) => handlePassengerChange(index, "age", e.target.value)}
                              required
                            />
                          </div>
                          <div className="form-group half">
                            <label className="form-label">Gender</label>
                            <select
                              className="input-field select-field"
                              value={passengers[index].gender}
                              onChange={(e) => handlePassengerChange(index, "gender", e.target.value)}
                              required
                            >
                              <option value="" disabled>Select Gender</option>
                              <option value="Male">Male</option>
                              <option value="Female">Female</option>
                              <option value="Other">Other</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="glass-panel form-panel mt-4">
                <div className="panel-header">
                  <h3><i className="fas fa-envelope text-accent"></i> Contact Details</h3>
                  <p className="panel-subtitle">Your ticket will be sent to these details.</p>
                </div>
                
                <div className="contact-inputs">
                  <div className="form-group">
                    <label className="form-label">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      className="input-field"
                      placeholder="Enter your email"
                      value={applicant.email}
                      onChange={handleApplicantChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      className="input-field"
                      placeholder="Enter phone number"
                      value={applicant.phone}
                      onChange={handleApplicantChange}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="form-actions">
                <button type="submit" className="btn-primary submit-btn" disabled={isSubmitting}>
                  {isSubmitting ? <><i className="fas fa-spinner fa-spin"></i> Processing...</> : "Continue to Payment"}
                </button>
              </div>
            </form>
          </div>

          {/* Summary Section */}
          <div className="checkout-summary-section">
            <div className="glass-panel summary-card sticky-card">
              <h3>Trip Summary</h3>
              
              <div className="summary-route">
                <div className="summary-bus-name">{selectedBus.company || 'NeoYatra Express'}</div>
                <div className="journey-line-display">
                  <div className="point">
                    <span className="dot source-dot"></span>
                    <span className="city">{selectedBus.source}</span>
                  </div>
                  <div className="dashed-line"></div>
                  <div className="point">
                    <span className="dot dest-dot"></span>
                    <span className="city">{selectedBus.destination}</span>
                  </div>
                </div>
                <div className="summary-date"><i className="far fa-calendar-alt"></i> {selectedBus.date}</div>
              </div>

              <div className="summary-details">
                <div className="summary-row">
                  <span>Selected Seats ({selectedSeats.length})</span>
                  <span className="font-semibold">{selectedSeats.join(", ")}</span>
                </div>
              </div>

              <div className="fare-breakdown">
                <h4>Fare Breakdown</h4>
                <div className="summary-row">
                  <span>Base Fare</span>
                  <span>₹ {selectedBus.price * selectedSeats.length}</span>
                </div>
                <div className="summary-row">
                  <span>Taxes & Fees</span>
                  <span>₹ 0</span>
                </div>
                <div className="summary-row total-row">
                  <span>Total Amount</span>
                  <span className="text-accent">₹ {totalPrice}</span>
                </div>
              </div>
              
              <div className="secure-badge">
                <i className="fas fa-shield-alt"></i> Secure Booking Guaranteed
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default CheckoutPage;
