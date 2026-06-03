import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchMyBookings, cancelBooking } from "../services/bookingService";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./MyBookings.css";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const loadBookings = async (pageNumber = 1) => {
    try {
      setIsLoading(true);
      setErrorMessage("");
      const data = await fetchMyBookings(pageNumber, 8);
      setBookings(data.bookings || []);
      setPage(data.page || 1);
      setPages(data.pages || 1);
    } catch (err) {
      setErrorMessage(err.response?.data?.message || "Error fetching bookings.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadBookings(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleViewBooking = (booking) => {
    navigate("/invoice", { state: { bookingData: booking } });
  };

  const handleCancel = async (bookingId) => {
    if(!window.confirm("Are you sure you want to cancel this booking?")) return;
    try {
      setErrorMessage("");
      await cancelBooking(bookingId);
      await loadBookings(page);
    } catch (err) {
      setErrorMessage(err.response?.data?.message || "Error cancelling booking.");
    }
  };

  const handlePageChange = (nextPage) => {
    if (nextPage >= 1 && nextPage <= pages) {
      loadBookings(nextPage);
    }
  };

  return (
    <div className="mybookings-wrapper">
      <Navbar />

      <div className="mybookings-container animate-fade-in">
        <div className="mybookings-header">
          <h1 className="gradient-text"><i className="fas fa-ticket-alt"></i> My Bookings</h1>
        </div>

        {errorMessage && (
          <div className="error-alert">
            <i className="fas fa-exclamation-circle"></i> {errorMessage}
          </div>
        )}

        <div className="bookings-content">
          {isLoading ? (
            <div className="loading-state glass-panel">
              <i className="fas fa-spinner fa-spin loading-icon"></i>
              <p>Fetching your travel history...</p>
            </div>
          ) : bookings.length === 0 ? (
            <div className="empty-state glass-panel">
              <i className="fas fa-bus empty-icon"></i>
              <h3>No bookings found</h3>
              <p>You haven't booked any trips yet. Time to plan a journey!</p>
              <button className="btn-primary mt-6" onClick={() => navigate("/home")}>
                Book a Ticket
              </button>
            </div>
          ) : (
            <>
              <div className="booking-list">
                {bookings.map((booking, index) => (
                  <div key={booking._id} className="booking-card glass-panel" style={{ "--delay": `${index * 0.1}s` }}>
                    <div className="booking-card-header">
                      <div className="booking-route">
                        <h3>{booking.busId?.source} <i className="fas fa-arrow-right text-muted"></i> {booking.busId?.destination}</h3>
                        <span className="booking-date">{booking.busId?.date}</span>
                      </div>
                      <span className={`status-pill status-${booking.status?.toLowerCase() || 'pending'}`}>
                        {booking.status?.toUpperCase() || 'PENDING'}
                      </span>
                    </div>

                    <div className="booking-card-body">
                      <div className="booking-detail">
                        <span className="detail-label">Booking ID</span>
                        <span className="detail-value font-mono">{booking._id.slice(-6).toUpperCase()}</span>
                      </div>
                      <div className="booking-detail">
                        <span className="detail-label">Seats</span>
                        <span className="detail-value">{booking.seats.join(", ")}</span>
                      </div>
                      <div className="booking-detail">
                        <span className="detail-label">Amount Paid</span>
                        <span className="detail-value">₹ {booking.total}</span>
                      </div>
                    </div>

                    <div className="booking-card-footer">
                      <button className="btn-secondary btn-sm" onClick={() => handleViewBooking(booking)}>
                        <i className="fas fa-file-invoice"></i> View Ticket
                      </button>
                      {booking.status !== 'cancelled' && (
                        <button className="btn-secondary btn-sm btn-danger-outline" onClick={() => handleCancel(booking._id)}>
                          Cancel Trip
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {pages > 1 && (
                <div className="pagination-controls">
                  <button className="btn-secondary" onClick={() => handlePageChange(page - 1)} disabled={page <= 1}>
                    <i className="fas fa-chevron-left"></i> Prev
                  </button>
                  <span className="page-indicator">Page {page} of {pages}</span>
                  <button className="btn-secondary" onClick={() => handlePageChange(page + 1)} disabled={page >= pages}>
                    Next <i className="fas fa-chevron-right"></i>
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default MyBookings;
