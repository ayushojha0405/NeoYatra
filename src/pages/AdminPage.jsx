import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { fetchAllBookings } from "../services/bookingService";
import { createBus } from "../services/busService";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./AdminPage.css";

const AdminPage = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [form, setForm] = useState({
    source: "",
    destination: "",
    date: "",
    price: "",
    totalSeats: ""
  });

  const loadBookings = async (pageNumber = 1) => {
    try {
      setIsLoading(true);
      setErrorMessage("");
      const data = await fetchAllBookings(pageNumber, 8);
      setBookings(data.bookings || []);
      setPage(data.page || 1);
      setPages(data.pages || 1);
    } catch (err) {
      setErrorMessage(err.response?.data?.message || "Error loading bookings.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user?.role === "admin") {
      loadBookings(page);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddBus = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (!form.source || !form.destination || !form.date || !form.price || !form.totalSeats) {
      setErrorMessage("Please fill in all bus fields.");
      return;
    }

    try {
      await createBus({
        source: form.source,
        destination: form.destination,
        date: form.date,
        price: Number(form.price),
        totalSeats: Number(form.totalSeats)
      });
      setSuccessMessage("Bus added successfully.");
      setForm({ source: "", destination: "", date: "", price: "", totalSeats: "" });
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      setErrorMessage(err.response?.data?.message || "Error adding bus.");
    }
  };

  const handlePageChange = (nextPage) => {
    if (nextPage >= 1 && nextPage <= pages) {
      loadBookings(nextPage);
    }
  };

  if (!user?.role || user.role !== "admin") {
    return (
      <div className="admin-wrapper">
        <Navbar />
        <div className="empty-state full-height">
          <i className="fas fa-lock empty-icon text-danger"></i>
          <h2>Admin Access Required</h2>
          <p>You must be an administrator to view this page.</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="admin-wrapper">
      <Navbar />

      <div className="admin-container animate-fade-in">
        <div className="admin-header">
          <h1 className="gradient-text"><i className="fas fa-user-shield"></i> Admin Dashboard</h1>
          <p>Manage buses and view all platform bookings.</p>
        </div>

        {errorMessage && <div className="error-alert"><i className="fas fa-exclamation-circle"></i> {errorMessage}</div>}
        {successMessage && <div className="success-alert"><i className="fas fa-check-circle"></i> {successMessage}</div>}

        <div className="admin-grid">
          {/* Add Bus Section */}
          <section className="admin-section">
            <div className="glass-panel form-panel">
              <div className="panel-header">
                <h3><i className="fas fa-bus text-accent"></i> Add New Bus</h3>
              </div>
              <form className="admin-form" onSubmit={handleAddBus}>
                <div className="form-group-row">
                  <div className="form-group half">
                    <label className="form-label">Source City</label>
                    <input type="text" className="input-field" name="source" value={form.source} onChange={handleInputChange} placeholder="e.g. Mumbai" required />
                  </div>
                  <div className="form-group half">
                    <label className="form-label">Destination City</label>
                    <input type="text" className="input-field" name="destination" value={form.destination} onChange={handleInputChange} placeholder="e.g. Pune" required />
                  </div>
                </div>
                
                <div className="form-group">
                  <label className="form-label">Journey Date</label>
                  <input type="date" className="input-field" name="date" value={form.date} onChange={handleInputChange} required />
                </div>
                
                <div className="form-group-row">
                  <div className="form-group half">
                    <label className="form-label">Price (₹)</label>
                    <input type="number" min="0" className="input-field" name="price" value={form.price} onChange={handleInputChange} placeholder="e.g. 1500" required />
                  </div>
                  <div className="form-group half">
                    <label className="form-label">Total Seats</label>
                    <input type="number" min="1" className="input-field" name="totalSeats" value={form.totalSeats} onChange={handleInputChange} placeholder="e.g. 40" required />
                  </div>
                </div>
                
                <button type="submit" className="btn-primary admin-submit-btn">
                  <i className="fas fa-plus"></i> Add Bus
                </button>
              </form>
            </div>
          </section>

          {/* Bookings Section */}
          <section className="admin-section">
            <div className="glass-panel table-panel">
              <div className="panel-header">
                <h3><i className="fas fa-clipboard-list text-accent"></i> All Bookings</h3>
              </div>
              
              {isLoading ? (
                <div className="loading-state">
                  <i className="fas fa-spinner fa-spin loading-icon"></i>
                  <p>Loading platform bookings...</p>
                </div>
              ) : bookings.length === 0 ? (
                <div className="empty-state">
                  <i className="fas fa-ticket-alt empty-icon"></i>
                  <p>No bookings found on the platform.</p>
                </div>
              ) : (
                <>
                  <div className="table-responsive">
                    <table className="admin-table">
                      <thead>
                        <tr>
                          <th>Route</th>
                          <th>Date</th>
                          <th>User</th>
                          <th>Seats</th>
                          <th>Amount</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {bookings.map((booking) => (
                          <tr key={booking._id}>
                            <td>
                              <div className="route-cell">
                                {booking.busId?.source} <i className="fas fa-arrow-right text-muted mx-1"></i> {booking.busId?.destination}
                              </div>
                            </td>
                            <td>{booking.busId?.date}</td>
                            <td>
                              <div className="user-cell">
                                <span className="user-name">{booking.userId?.name}</span>
                                <span className="user-email">{booking.userId?.email}</span>
                              </div>
                            </td>
                            <td><span className="font-mono">{booking.seats.length}</span></td>
                            <td className="font-semibold">₹ {booking.total}</td>
                            <td>
                              <span className={`status-pill status-${booking.status?.toLowerCase() || 'pending'}`}>
                                {booking.status?.toUpperCase() || 'PENDING'}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {pages > 1 && (
                    <div className="pagination-controls mt-4">
                      <button className="btn-secondary btn-sm" onClick={() => handlePageChange(page - 1)} disabled={page <= 1}>
                        <i className="fas fa-chevron-left"></i>
                      </button>
                      <span className="page-indicator">Page {page} of {pages}</span>
                      <button className="btn-secondary btn-sm" onClick={() => handlePageChange(page + 1)} disabled={page >= pages}>
                        <i className="fas fa-chevron-right"></i>
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </section>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default AdminPage;
