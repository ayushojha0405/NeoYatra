import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import HomePage from "./pages/HomePage";
import TicketsPage from "./pages/TicketsPage";
import BusDetailsPage from "./pages/BusDetailsPage";
import CheckoutPage from "./pages/CheckoutPage";
import PaymentPage from "./pages/PaymentPage";
import InvoicePage from "./pages/InvoicePage";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminPage from "./pages/AdminPage";
import MyBookings from "./pages/MyBookings";
import AboutPage from "./pages/AboutPage";
import ProfilePage from "./pages/ProfilePage";
import NotFoundPage from "./pages/NotFoundPage";
import HelpCenterPage from "./pages/HelpCenterPage";
import TermsPage from "./pages/TermsPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import ContactPage from "./pages/ContactPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/signin" element={<SignInPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/help" element={<HelpCenterPage />} />
      <Route path="/terms" element={<TermsPage />} />
      <Route path="/privacy" element={<PrivacyPolicyPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route
        path="/home"
        element={<ProtectedRoute><HomePage /></ProtectedRoute>}
      />
      <Route
        path="/tickets"
        element={<ProtectedRoute><TicketsPage /></ProtectedRoute>}
      />
      <Route
        path="/bus/:id"
        element={<ProtectedRoute><BusDetailsPage /></ProtectedRoute>}
      />
      <Route
        path="/checkout"
        element={<ProtectedRoute><CheckoutPage /></ProtectedRoute>}
      />
      <Route
        path="/payment"
        element={<ProtectedRoute><PaymentPage /></ProtectedRoute>}
      />
      <Route
        path="/invoice"
        element={<ProtectedRoute><InvoicePage /></ProtectedRoute>}
      />
      <Route
        path="/bookings"
        element={<ProtectedRoute><MyBookings /></ProtectedRoute>}
      />
      <Route
        path="/admin"
        element={<ProtectedRoute><AdminPage /></ProtectedRoute>}
      />
      <Route
        path="/profile"
        element={<ProtectedRoute><ProfilePage /></ProtectedRoute>}
      />
      {/* Catch-all Route for 404 Not Found */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
