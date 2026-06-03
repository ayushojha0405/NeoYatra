import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useAuth } from "../context/AuthContext";
import "./ProfilePage.css";
import { useNavigate } from "react-router-dom";

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="profile-container">
      <Navbar />
      <div className="profile-content animate-fade-in">
        <div className="glass-panel profile-card">
          <div className="profile-header">
            <div className="profile-avatar">
              {user?.name?.charAt(0).toUpperCase() || 'U'}
            </div>
            <h2>{user?.name || 'User'}</h2>
            <p className="profile-email">{user?.email || 'No email provided'}</p>
            {user?.role === 'admin' && (
              <span className="admin-badge">Admin</span>
            )}
          </div>
          
          <div className="profile-actions">
            <button className="btn-secondary" onClick={() => navigate('/bookings')}>
              <i className="fas fa-ticket-alt"></i> My Bookings
            </button>
            <button className="btn-primary" onClick={handleLogout} style={{ backgroundColor: 'var(--accent-danger)' }}>
              <i className="fas fa-sign-out-alt"></i> Logout
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
