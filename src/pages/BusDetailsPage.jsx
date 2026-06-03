import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchBusById } from "../services/busService";
import { useBooking } from "../context/BookingContext";
import { useAuth } from "../context/AuthContext";
import { io } from "socket.io-client";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./BusDetailsPage.css";

const BusDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { selectedSeats, setSelectedSeats, setSelectedBus } = useBooking();
  const { user } = useAuth();
  const [bus, setBus] = useState(null);
  const [bookedSeats, setBookedSeats] = useState([]);
  const [lockedSeats, setLockedSeats] = useState({}); // { seatId: userId }
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Setup Socket
    const rawApiUrl = import.meta.env.VITE_API_URL?.trim() || "";
    const socketUrl = rawApiUrl ? rawApiUrl.replace(/\/+$/, "") : window.location.origin;
    const newSocket = io(socketUrl, { withCredentials: true });
    setSocket(newSocket);

    newSocket.emit("join_bus", id);

    newSocket.on("seat_locked", ({ seatId, userId }) => {
      setLockedSeats((prev) => ({ ...prev, [seatId]: userId }));
    });

    newSocket.on("seat_unlocked", ({ seatId }) => {
      setLockedSeats((prev) => {
        const newState = { ...prev };
        delete newState[seatId];
        return newState;
      });
    });

    newSocket.on("seat_booked", ({ seatId }) => {
      setBookedSeats((prev) => [...prev, seatId]);
      setLockedSeats((prev) => {
        const newState = { ...prev };
        delete newState[seatId];
        return newState;
      });
      // Deselect if we had it selected
      setSelectedSeats((prev) => prev.filter((s) => s.toUpperCase() !== seatId.toUpperCase()));
    });

    return () => newSocket.disconnect();
  }, [id, setSelectedSeats]);

  useEffect(() => {
    const fetchBusDetails = async () => {
      try {
        setLoading(true);
        setErrorMessage("");
        const busData = await fetchBusById(id);
        setBus(busData);
        setSelectedBus(busData);
        setBookedSeats(busData.bookedSeats || []);
        
        const initialLocks = {};
        (busData.lockedSeats || []).forEach(lock => {
          initialLocks[lock.seatId] = lock.userId;
        });
        setLockedSeats(initialLocks);

        setSelectedSeats((prev) =>
          prev.filter((seat) => !(busData.bookedSeats || []).map((s) => s.toUpperCase()).includes(seat.toUpperCase()))
        );
      } catch (error) {
        setErrorMessage(error.response?.data?.message || "Error loading bus details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchBusDetails();
  }, [id, setSelectedBus, setSelectedSeats]);

  const toggleSeat = (seat) => {
    const seatKey = seat.toUpperCase();
    if (bookedSeats.map((s) => s.toUpperCase()).includes(seatKey)) {
      return; 
    }
    
    // Cannot select if someone else locked it
    if (lockedSeats[seatKey] && lockedSeats[seatKey] !== user.id) {
      return;
    }

    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seat));
      if (socket) socket.emit("unlock_seat", { busId: id, seatId: seatKey, userId: user.id });
    } else {
      setSelectedSeats([...selectedSeats, seat]);
      if (socket) socket.emit("lock_seat", { busId: id, seatId: seatKey, userId: user.id });
    }
  };

  const getSeatClass = (seat) => {
    const seatKey = seat.toUpperCase();
    if (bookedSeats.map((s) => s.toUpperCase()).includes(seatKey)) {
      return "seat booked";
    }
    if (lockedSeats[seatKey] && lockedSeats[seatKey] !== user.id) {
      return "seat locked"; // Someone else has it
    }
    if (selectedSeats.includes(seat)) return "seat selected";
    return "seat available";
  };

  const handleCheckout = () => {
    if (selectedSeats.length === 0) return;
    navigate("/checkout", {
      state: { selectedBus: bus, selectedSeats },
    });
  };

  if (loading) return (
    <div className="bus-details-wrapper">
      <Navbar />
      <div className="loading-state full-height"><i className="fas fa-spinner fa-spin loading-icon"></i><p>Loading bus layout...</p></div>
      <Footer />
    </div>
  );

  if (errorMessage || !bus) return (
    <div className="bus-details-wrapper">
      <Navbar />
      <div className="error-state full-height"><i className="fas fa-exclamation-triangle text-danger"></i><p>{errorMessage || "Bus not found"}</p></div>
      <Footer />
    </div>
  );

  return (
    <div className="bus-details-wrapper">
      <Navbar />
      
      <div className="bus-details-container animate-fade-in">
        <div className="bus-header">
          <h1 className="gradient-text">{bus.source} to {bus.destination}</h1>
          <p className="bus-meta">{bus.company || 'NeoYatra Express'} • {bus.date} • {bus.type || 'A/C Sleeper'}</p>
        </div>

        <div className="bus-layout-grid">
          {/* Seat Layout Panel */}
          <div className="layout-panel glass-panel">
            <div className="panel-header">
              <h3>Select Seats</h3>
              <div className="seat-legend">
                <div className="legend-item"><div className="seat-box available"></div> Available</div>
                <div className="legend-item"><div className="seat-box selected"></div> Selected</div>
                <div className="legend-item"><div className="seat-box booked"></div> Booked</div>
              </div>
            </div>

            <div className="seats-container">
              <div className="steering-wheel"><i className="fas fa-steering-wheel"></i></div>
              
              <div className="seats-grid">
                {Array.from({ length: 9 }).map((_, rIndex) => {
                  const rowNum = rIndex + 1;
                  return (
                    <div key={rowNum} className="seat-row">
                      <div className={getSeatClass(`${rowNum}A`)} onClick={() => toggleSeat(`${rowNum}A`)}><span>{rowNum}A</span></div>
                      <div className={getSeatClass(`${rowNum}B`)} onClick={() => toggleSeat(`${rowNum}B`)}><span>{rowNum}B</span></div>
                      <div className="aisle-space"></div>
                      <div className={getSeatClass(`${rowNum}C`)} onClick={() => toggleSeat(`${rowNum}C`)}><span>{rowNum}C</span></div>
                      <div className={getSeatClass(`${rowNum}D`)} onClick={() => toggleSeat(`${rowNum}D`)}><span>{rowNum}D</span></div>
                    </div>
                  );
                })}
                <div className="seat-row back-row">
                  {["A", "B", "C", "D", "E"].map((col) => (
                    <div key={`10${col}`} className={getSeatClass(`10${col}`)} onClick={() => toggleSeat(`10${col}`)}><span>10{col}</span></div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Booking Summary Panel */}
          <div className="summary-panel">
            <div className="glass-panel summary-card">
              <h3>Booking Summary</h3>
              
              <div className="summary-section">
                <div className="journey-line-display">
                  <div className="point">
                    <span className="dot source-dot"></span>
                    <span className="city">{bus.source}</span>
                  </div>
                  <div className="dashed-line"></div>
                  <div className="point">
                    <span className="dot dest-dot"></span>
                    <span className="city">{bus.destination}</span>
                  </div>
                </div>
              </div>

              <div className="summary-section">
                <h4>Selected Seats ({selectedSeats.length})</h4>
                <div className="selected-seats-grid">
                  {selectedSeats.length > 0 ? (
                    selectedSeats.map((seat) => (
                      <span key={seat} className="selected-seat-chip">{seat}</span>
                    ))
                  ) : (
                    <p className="no-selection">No seats selected yet.</p>
                  )}
                </div>
              </div>

              <div className="summary-section fare-details">
                <div className="fare-row">
                  <span>Base Fare</span>
                  <span>₹ {bus.price} x {selectedSeats.length}</span>
                </div>
                <div className="fare-row total-row">
                  <span>Total Amount</span>
                  <span className="text-accent">₹ {selectedSeats.length * bus.price}</span>
                </div>
              </div>

              <button 
                className="btn-primary checkout-btn" 
                onClick={handleCheckout} 
                disabled={selectedSeats.length === 0}
              >
                Proceed to Checkout <i className="fas fa-arrow-right"></i>
              </button>
            </div>

            {/* Info Card */}
            <div className="glass-panel info-card">
              <h3>Amenities</h3>
              <div className="amenities-grid">
                {bus.facilities && bus.facilities.length > 0 ? (
                  bus.facilities.map((fac, idx) => (
                    <div key={idx} className="amenity">
                      <i className={`fas fa-${fac === 'WiFi' ? 'wifi' : fac === 'Charging' ? 'plug' : fac === 'Blanket' ? 'bed' : 'tint'}`}></i> {fac}
                    </div>
                  ))
                ) : (
                  <div className="amenity"><i className="fas fa-bus"></i> Standard</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default BusDetailsPage;
