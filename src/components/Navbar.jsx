import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import "./Navbar.css";
import { useState, useEffect } from "react";

export default function Navbar() {
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActive = (path) => {
    return location.pathname === path ? "active" : "";
  };

  return (
    <nav className={`navbar ${isScrolled ? "scrolled glass-panel" : ""}`}>
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          Neo<span className="text-accent">Yatra</span>
        </Link>

        <div className="menu-icon" onClick={toggleMenu}>
          <i className={isMenuOpen ? "fas fa-times" : "fas fa-bars"}></i>
        </div>

        <ul className={`navbar-links ${isMenuOpen ? "active" : ""}`}>
          <li>
            <Link to="/home" className={isActive("/home")}>Home</Link>
          </li>
          <li>
            <Link to="/tickets" className={isActive("/tickets")}>Tickets</Link>
          </li>
          {user && (
            <li>
              <Link to="/bookings" className={isActive("/bookings")}>My Bookings</Link>
            </li>
          )}
          <li>
            <Link to="/about" className={isActive("/about")}>About</Link>
          </li>
          {user?.role === 'admin' && (
            <li>
              <Link to="/admin" className={isActive("/admin")}>Admin</Link>
            </li>
          )}
        </ul>

        <div className={`navbar-auth ${isMenuOpen ? "active" : ""}`}>
          <button className="theme-toggle-btn" onClick={toggleTheme} aria-label="Toggle Theme">
            {theme === "dark" ? <i className="fas fa-sun"></i> : <i className="fas fa-moon"></i>}
          </button>
          {user ? (
            <Link to="/profile" className="profile-btn">
              <div className="profile-avatar-small">
                {user.name?.charAt(0).toUpperCase() || 'U'}
              </div>
              <span className="profile-name">{user.name?.split(' ')[0] || 'User'}</span>
            </Link>
          ) : (
            <>
              <Link to="/signin" className="nav-login">Login</Link>
              <Link to="/signup" className="btn-primary btn-sm">Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}