import "./SignInPage.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";

export default function SignInPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [touched, setTouched] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched(true);
    setErrorMessage("");
    if (!isFormValid) return;
    setIsSubmitting(true);
    const result = await login(formData.email, formData.password);

    if (result.success) {
      navigate("/home");
    } else {
      setErrorMessage(result.message || "Invalid email or password!");
    }
    setIsSubmitting(false);
  };

  const isEmailValid = /\S+@\S+\.\S+/.test(formData.email);
  const isPasswordValid = formData.password.length >= 8;
  const isFormValid = isEmailValid && isPasswordValid;

  return (
    <div className="auth-wrapper">
      <Navbar />
      
      <div className="auth-container animate-fade-in">
        <div className="glass-panel auth-card">
          <div className="auth-header">
            <h2>Welcome Back</h2>
            <p>Sign in to continue your journey</p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            {errorMessage && (
              <div className="error-alert">
                <i className="fas fa-exclamation-circle"></i> {errorMessage}
              </div>
            )}
            
            {touched && !isEmailValid && <div className="error-text">Please enter a valid email address.</div>}
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <div className="input-with-icon">
                <i className="fas fa-envelope icon"></i>
                <input
                  type="email"
                  name="email"
                  className="input-field"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {touched && !isPasswordValid && <div className="error-text">Password must be at least 8 characters.</div>}
            <div className="form-group">
              <label className="form-label">Password</label>
              <div className="input-with-icon">
                <i className="fas fa-lock icon"></i>
                <input
                  type="password"
                  name="password"
                  className="input-field"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <button type="submit" className="btn-primary auth-submit-btn" disabled={isSubmitting}>
              {isSubmitting ? <><i className="fas fa-spinner fa-spin"></i> Signing In...</> : "Sign In"}
            </button>
          </form>

          <div className="auth-footer">
            <p>
              Don't have an account? <Link to="/signup" className="text-accent">Sign Up</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
