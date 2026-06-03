import { useEffect, useRef } from "react";
import "./LandingPage.css";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ServiceCard from "../components/ServiceCard";

export default function LandingPage() {
  const sectionsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => {
      sectionsRef.current.forEach((section) => {
        if (section) observer.unobserve(section);
      });
    };
  }, []);

  return (
    <div className="landing-container">
      <Navbar />

      {/* Hero Section */}
      <section className="landing-hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="animate-fade-in">
            Welcome to <span className="text-accent">NeoYatra</span>
          </h1>
          <p className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
            Experience the future of bus travel. Fast, reliable, and seamless reservations with secure payments.
          </p>
          <div className="hero-actions animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <Link to="/home" className="btn-primary hero-btn">
              <i className="fas fa-ticket-alt"></i> Book Now
            </Link>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section
        ref={(el) => (sectionsRef.current[0] = el)}
        className="vision animate-on-scroll"
      >
        <div className="section-container">
          <h2 className="gradient-text">Our Vision</h2>
          <p className="vision-text">
            NeoYatra aims to revolutionize the way people book and manage bus journeys. With user-friendly tools, real-time seat selection, and secure payments, we ensure a smooth travel experience for everyone.
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section
        ref={(el) => (sectionsRef.current[1] = el)}
        className="services animate-on-scroll"
      >
        <div className="section-container">
          <h2 className="gradient-text">Why Choose Us?</h2>
          <div className="services-grid">
            <ServiceCard
              icon={<i className="fas fa-credit-card"></i>}
              title="Easy Payments"
              description="Fast and secure transactions with multiple payment options."
              style={{ '--delay': '0.1s' }}
            />
            <ServiceCard
              icon={<i className="fas fa-bus"></i>}
              title="Trusted Operators"
              description="Book with verified bus companies for a safe journey."
              style={{ '--delay': '0.2s' }}
            />
            <ServiceCard
              icon={<i className="fas fa-headset"></i>}
              title="24/7 Support"
              description="Our dedicated team is always here to help you."
              style={{ '--delay': '0.3s' }}
            />
            <ServiceCard
              icon={<i className="fas fa-map-marker-alt"></i>}
              title="Live Tracking"
              description="Track your bus location in real-time."
              style={{ '--delay': '0.4s' }}
            />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section
        ref={(el) => (sectionsRef.current[2] = el)}
        className="how-it-works animate-on-scroll"
      >
        <div className="section-container">
          <h2 className="gradient-text">How It Works</h2>
          <div className="steps-container">
            <div className="step glass-panel">
              <div className="step-icon">1</div>
              <h3>Search Route</h3>
              <p>Enter your departure, destination, and travel date to find buses.</p>
            </div>
            <div className="step glass-panel">
              <div className="step-icon">2</div>
              <h3>Select & Book</h3>
              <p>Choose your preferred bus, select your seats, and confirm.</p>
            </div>
            <div className="step glass-panel">
              <div className="step-icon">3</div>
              <h3>Pay & Travel</h3>
              <p>Pay securely online and get your e-ticket instantly.</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}