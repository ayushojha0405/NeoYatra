import "./SignInPage.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { registerUser } from "../services/authService";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function SignUpPage() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [touched, setTouched] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched(true);
    setErrorMessage("");

    if (!isFormValid) return;

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    try {
      setIsSubmitting(true);
      await registerUser({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      navigate("/signin");
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Error creating account. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isEmailValid = /\S+@\S+\.\S+/.test(formData.email);
  const hasUpper = /[A-Z]/.test(formData.password);
  const hasLower = /[a-z]/.test(formData.password);
  const hasNumber = /\d/.test(formData.password);
  const isPasswordStrong = formData.password.length >= 8 && hasUpper && hasLower && hasNumber;
  const isConfirmMatch = formData.password === formData.confirmPassword && formData.confirmPassword.length > 0;
  const isNameValid = formData.name.trim().length > 1;
  const isFormValid = isNameValid && isEmailValid && isPasswordStrong && isConfirmMatch;

  return (
    <div className="auth-wrapper">
      <Navbar />
      
      <div className="auth-container animate-fade-in">
        <div className="glass-panel auth-card">
          <div className="auth-header">
            <h2>Create Account</h2>
            <p>Join NeoYatra for a seamless travel experience</p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            {errorMessage && (
              <div className="error-alert">
                <i className="fas fa-exclamation-circle"></i> {errorMessage}
              </div>
            )}
            
            {touched && !isNameValid && <div className="error-text">Please enter your full name.</div>}
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <div className="input-with-icon">
                <i className="fas fa-user icon"></i>
                <input
                  type="text"
                  name="name"
                  className="input-field"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

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

            {touched && !isPasswordStrong && (
              <div className="error-text">Password must be 8+ chars with uppercase, lowercase, and number.</div>
            )}
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

            {touched && !isConfirmMatch && <div className="error-text">Confirm password must match password.</div>}
            <div className="form-group">
              <label className="form-label">Confirm Password</label>
              <div className="input-with-icon">
                <i className="fas fa-check-circle icon"></i>
                <input
                  type="password"
                  name="confirmPassword"
                  className="input-field"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <button type="submit" className="btn-primary auth-submit-btn" disabled={isSubmitting}>
              {isSubmitting ? <><i className="fas fa-spinner fa-spin"></i> Creating Account...</> : "Sign Up"}
            </button>
          </form>

          <div className="auth-footer">
            <p>
              Already have an account? <Link to="/signin" className="text-accent">Sign In</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
