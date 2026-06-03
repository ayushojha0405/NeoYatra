import "./TicketsPage.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { fetchBuses } from "../services/busService";
import { useBooking } from "../context/BookingContext";

export default function TicketsPage() {
  const { search, setSearch, setSelectedBus, setSelectedSeats, setCurrentBooking } = useBooking();
  const [maxPrice, setMaxPrice] = useState(search.maxPrice || 3000);
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const sourceParam = queryParams.get("source");
  const destinationParam = queryParams.get("destination");
  const dateParam = queryParams.get("date");

  const [buses, setBuses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const loadBuses = async () => {
      try {
        setIsLoading(true);
        setErrorMessage("");
        const params = {};
        if (sourceParam) params.source = sourceParam;
        if (destinationParam) params.destination = destinationParam;
        if (dateParam) params.date = dateParam;
        if (maxPrice) params.maxPrice = maxPrice;
        const data = await fetchBuses(params);
        setBuses(data);
      } catch (error) {
        setErrorMessage(error.response?.data?.message || "Error loading buses. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    loadBuses();
  }, [sourceParam, destinationParam, dateParam, maxPrice]);

  const clearFilters = () => {
    setMaxPrice(3000);
    setSearch((prev) => ({ ...prev, maxPrice: 3000 }));
    navigate(location.pathname, { replace: true });
  };

  useEffect(() => {
    setSearch((prev) => ({ ...prev, maxPrice }));
  }, [maxPrice, setSearch]);

  return (
    <div className="tickets-wrapper">
      <Navbar />

      <div className="tickets-layout">
        {/* Filters Section */}
        <aside className="filters-sidebar glass-panel">
          <div className="filters-header">
            <h3><i className="fas fa-filter text-accent"></i> Filters</h3>
          </div>

          <div className="filter-section">
            <div className="filter-title">
              <span>Max Price</span>
              <span className="price-badge">₹{maxPrice}</span>
            </div>
            <input
              type="range"
              min="500"
              max="5000"
              step="100"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="price-slider"
            />
            <div className="slider-labels">
              <span>₹500</span>
              <span>₹5000</span>
            </div>
          </div>

          <button className="btn-secondary clear-filters-btn" onClick={clearFilters}>
            <i className="fas fa-undo"></i> Reset Filters
          </button>
        </aside>

        {/* Bus List Section */}
        <main className="bus-list-section">
          <div className="bus-list-header">
            <h2 className="gradient-text">Available Buses</h2>
            {(sourceParam && destinationParam) && (
              <p className="route-subtitle">
                {sourceParam} <i className="fas fa-arrow-right"></i> {destinationParam}
                {dateParam && ` on ${dateParam}`}
              </p>
            )}
          </div>
          
          <div className="bus-cards-container">
            {isLoading && (
              <div className="loading-state">
                <i className="fas fa-spinner fa-spin loading-icon"></i>
                <p>Finding the best buses for you...</p>
              </div>
            )}
            
            {errorMessage && (
              <div className="error-state glass-panel">
                <i className="fas fa-exclamation-circle text-danger"></i>
                <p>{errorMessage}</p>
              </div>
            )}
            
            {!isLoading && !errorMessage && buses.length > 0 ? (
              buses.map((bus, index) => (
                <div
                  key={bus._id}
                  className="bus-card glass-panel"
                  style={{ "--delay": `${index * 0.1}s` }}
                  onClick={() => {
                    setSelectedBus(bus);
                    setSelectedSeats([]);
                    setCurrentBooking(null);
                    navigate(`/bus/${bus._id}`);
                  }}
                >
                  <div className="bus-card-left">
                    <div className="bus-operator">
                      <i className="fas fa-bus-alt text-accent"></i>
                      <div>
                        <h3>{bus.company || 'NeoYatra Express'}</h3>
                        <span className="bus-type">{bus.type || 'A/C Sleeper (2+1)'}</span>
                      </div>
                    </div>
                    
                    <div className="bus-timing">
                      <div className="time-block">
                        <span className="time">{bus.time || '21:00'}</span>
                        <span className="location">{bus.source}</span>
                      </div>
                      <div className="duration">
                        <span className="line"></span>
                        <span className="hrs">10h 30m</span>
                        <span className="line"></span>
                      </div>
                      <div className="time-block">
                        <span className="time">Morning</span>
                        <span className="location">{bus.destination}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bus-card-divider"></div>
                  
                  <div className="bus-card-right">
                    <div className="price-container">
                      <span className="currency">₹</span>
                      <span className="amount">{bus.price}</span>
                    </div>
                    <div className="seats-info">
                      <i className="fas fa-chair"></i> {bus.totalSeats - (bus.bookedSeats?.length || 0)} seats left
                    </div>
                    <button className="btn-primary select-seat-btn">Select Seats</button>
                  </div>
                </div>
              ))
            ) : (
              !isLoading && !errorMessage && (
                <div className="empty-state glass-panel">
                  <i className="fas fa-bus empty-icon"></i>
                  <h3>No buses found</h3>
                  <p>Try adjusting your filters or searching for different dates.</p>
                </div>
              )
            )}
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}
