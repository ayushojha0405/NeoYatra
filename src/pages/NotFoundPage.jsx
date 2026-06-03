import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import "./NotFoundPage.css";

export default function NotFoundPage() {
  return (
    <div className="notfound-container">
      <Navbar />
      <div className="notfound-content animate-fade-in">
        <h1 className="gradient-text">404</h1>
        <h2>Oops! Page Not Found</h2>
        <p>The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.</p>
        <Link to="/" className="btn-primary mt-6">
          <i className="fas fa-home"></i> Go Back Home
        </Link>
      </div>
      <Footer />
    </div>
  );
}
