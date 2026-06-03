import "./HomePage.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ServiceCard from "../components/ServiceCard";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useBooking } from "../context/BookingContext";

export default function HomePage() {
  const navigate = useNavigate();
  const { setSearch, resetBookingFlow } = useBooking();
  const [fromLocation, setFromLocation] = useState('');
  const [toLocation, setToLocation] = useState('');
  const [journeyDate, setJourneyDate] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    const queryParams = new URLSearchParams();
    if (fromLocation) queryParams.append('source', fromLocation);
    if (toLocation) queryParams.append('destination', toLocation);
    if (journeyDate) queryParams.append('date', journeyDate);
    
    setSearch({
      source: fromLocation,
      destination: toLocation,
      date: journeyDate,
      maxPrice: 3000,
    });
    resetBookingFlow();
    navigate(`/tickets?${queryParams.toString()}`);
  };

  return (
    <div className="home-container">
      <Navbar />

      {/* Hero / Search Section */}
      <section className="home-hero">
        <div className="home-hero-bg"></div>
        <div className="home-hero-content animate-fade-in">
          <h1>Where to next?</h1>
          <p>Book your bus tickets with ease and travel in comfort.</p>
          
          <div className="search-glass-panel">
            <form onSubmit={handleSearch} className="search-form">
              <div className="search-input-group">
                <i className="fas fa-map-marker-alt input-icon"></i>
                <input 
                  type="text" 
                  placeholder="Leaving from" 
                  value={fromLocation} 
                  onChange={(e) => setFromLocation(e.target.value)} 
                  required
                />
              </div>
              <div className="search-input-group">
                <i className="fas fa-location-arrow input-icon"></i>
                <input 
                  type="text" 
                  placeholder="Going to" 
                  value={toLocation} 
                  onChange={(e) => setToLocation(e.target.value)} 
                  required
                />
              </div>
              <div className="search-input-group">
                <i className="fas fa-calendar-alt input-icon"></i>
                <input 
                  type="date" 
                  value={journeyDate} 
                  onChange={(e) => setJourneyDate(e.target.value)} 
                  required
                />
              </div>
              <button type="submit" className="btn-primary search-submit-btn">
                <i className="fas fa-search"></i> Search Buses
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Top Routes */}
      <section className="top-routes section-container">
        <h2 className="gradient-text">Popular Routes</h2>
        <div className="routes-grid">
          <div 
            className="route-card glass-panel" 
            style={{ '--delay': '0s' }}
            onClick={() => {
              setSearch({ source: 'Delhi', destination: 'Jaipur', date: '', maxPrice: 3000 });
              resetBookingFlow();
              navigate('/tickets?source=Delhi&destination=Jaipur');
            }}
          >
            <div className="route-info">
              <span className="route-city">Delhi</span>
              <i className="fas fa-exchange-alt route-icon"></i>
              <span className="route-city">Jaipur</span>
            </div>
          </div>
          <div 
            className="route-card glass-panel" 
            style={{ '--delay': '0.1s' }}
            onClick={() => {
              setSearch({ source: 'Mumbai', destination: 'Pune', date: '', maxPrice: 3000 });
              resetBookingFlow();
              navigate('/tickets?source=Mumbai&destination=Pune');
            }}
          >
            <div className="route-info">
              <span className="route-city">Mumbai</span>
              <i className="fas fa-exchange-alt route-icon"></i>
              <span className="route-city">Pune</span>
            </div>
          </div>
          <div 
            className="route-card glass-panel" 
            style={{ '--delay': '0.2s' }}
            onClick={() => {
              setSearch({ source: 'Bangalore', destination: 'Chennai', date: '', maxPrice: 3000 });
              resetBookingFlow();
              navigate('/tickets?source=Bangalore&destination=Chennai');
            }}
          >
            <div className="route-info">
              <span className="route-city">Bangalore</span>
              <i className="fas fa-exchange-alt route-icon"></i>
              <span className="route-city">Chennai</span>
            </div>
          </div>
          <div 
            className="route-card glass-panel" 
            style={{ '--delay': '0.3s' }}
            onClick={() => {
              setSearch({ source: 'Kolkata', destination: 'Howrah', date: '', maxPrice: 3000 });
              resetBookingFlow();
              navigate('/tickets?source=Kolkata&destination=Howrah');
            }}
          >
            <div className="route-info">
              <span className="route-city">Kolkata</span>
              <i className="fas fa-exchange-alt route-icon"></i>
              <span className="route-city">Howrah</span>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services section-container">
        <h2 className="gradient-text">Our Services</h2>
        <div className="services-grid">
          <ServiceCard
            style={{ '--delay': '0s' }}
            icon={<i className="fas fa-headset"></i>}
            title="24/7 Customer Support"
            description="Our dedicated team is always here to help you with any questions or issues, ensuring a smooth and stress-free journey."
          />
          <ServiceCard
            style={{ '--delay': '0.1s' }}
            icon={<i className="fas fa-undo"></i>}
            title="Easy Cancellation"
            description="Plans can change. That's why we offer a flexible and easy cancellation policy, allowing you to modify your bookings with ease."
          />
          <ServiceCard
            style={{ '--delay': '0.2s' }}
            icon={<i className="fas fa-shield-alt"></i>}
            title="Trusted Operators"
            description="We partner with a network of reliable and verified bus operators to ensure your safety and comfort on every trip."
          />
        </div>
      </section>

      <Footer />
    </div>
  );
}
