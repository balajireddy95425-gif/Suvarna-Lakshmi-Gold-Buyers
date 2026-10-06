import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";

import { useEffect, useState } from "react";
import { captureAdTracking } from "./utils/adTracking";

// =========================================
// WEBSITE COMPONENTS
// =========================================
import Navbar from "./components/Navbar";
import Footer from "./components/footer";
import WhatsAppButton from "./components/WhatsAppButton";

// =========================================
// PUBLIC PAGES
// =========================================

import Home from "./pages/Home";
import GoldRates from "./pages/GoldRates";
import GoldCalculatorPage from "./pages/GoldCalculatorPage";
import Services from "./pages/Services";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Branch from "./pages/Branch";
import FAQ from "./pages/FAQ";
import Appoinment from "./pages/Appoinment";
import Blog from "./pages/Blog";
import BlogDetails from "./pages/BlogDetails";

// =========================================
// ADMIN PAGES
// =========================================
import AdminBlog from "./Admin/AdminBlog";
import AdminLogin from "./Admin/AdminLogin";
import ProtectedRoute from "./Admin/ProtectedRoute";

import AdminDashboard from "./Admin/AdminDashboard";
import AdminLeads from "./Admin/AdminLeads";
import AdminValuations from "./Admin/AdminValuations";
import AdminAppointments from "./Admin/AdminAppointments";

import GoldRateManagement from "./Admin/GoldRateManagement";
import EnquiryManagement from "./Admin/EnquiryManagement";
import BranchManagement from "./Admin/BranchManagement";

// =========================================
// WEBSITE ENTRY POPUP
// =========================================

const WebsiteEntryPopup = () => {
  const location = useLocation();

  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    // Never show popup on admin pages
    if (location.pathname.startsWith("/admin")) {
      setShowPopup(false);
      return;
    }

    // Show popup only once in the current browser session
    const popupShown =
      sessionStorage.getItem("sl_gold_popup_shown");

    if (popupShown === "true") {
      return;
    }

    const timer = setTimeout(() => {
      setShowPopup(true);

      sessionStorage.setItem(
        "sl_gold_popup_shown",
        "true"
      );
    }, 900);

    return () => {
      clearTimeout(timer);
    };
  }, [location.pathname]);

  if (!showPopup) {
    return null;
  }

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "rgba(0, 0, 0, 0.68)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
      onClick={closePopup}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "460px",
          background:
            "linear-gradient(145deg, #fffdf8, #f7edd2)",
          borderRadius: "20px",
          padding: "30px",
          position: "relative",
          boxShadow: "0 20px 60px rgba(0,0,0,0.35)",
          textAlign: "center",
        }}
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        {/* Close */}
        <button
          type="button"
          onClick={closePopup}
          style={{
            position: "absolute",
            top: "12px",
            right: "15px",
            width: "34px",
            height: "34px",
            borderRadius: "50%",
            border: "none",
            background: "#2a1b08",
            color: "#fff",
            fontSize: "20px",
            cursor: "pointer",
          }}
        >
          ×
        </button>

        {/* Icon */}
        <div
          style={{
            width: "68px",
            height: "68px",
            margin: "0 auto 15px",
            borderRadius: "50%",
            background:
              "linear-gradient(135deg, #d4af37, #9c7215)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            fontSize: "28px",
            fontWeight: "700",
          }}
        >
          ₹
        </div>

        <h2
          style={{
            margin: "0 0 10px",
            color: "#2a1b08",
            fontSize: "28px",
          }}
        >
          Sell Your Gold With Confidence
        </h2>

        <p
          style={{
            margin: "0 auto 20px",
            maxWidth: "360px",
            color: "#5e5140",
            fontSize: "15px",
            lineHeight: "1.6",
          }}
        >
          Get an estimated value for your gold and
          connect with our gold-buying team.
        </p>

        {/* Calculator */}
        <Link
          to="/calculator"
          onClick={closePopup}
          style={{
            display: "block",
            textDecoration: "none",
            background:
              "linear-gradient(135deg, #c89b2c, #a67818)",
            color: "#fff",
            padding: "14px 20px",
            borderRadius: "10px",
            fontWeight: "700",
            marginBottom: "12px",
          }}
        >
          Calculate Gold Value
        </Link>

        {/* Call */}
        <a
          href="tel:9542568978"
          onClick={closePopup}
          style={{
            display: "block",
            textDecoration: "none",
            background: "#2a1b08",
            color: "#fff",
            padding: "14px 20px",
            borderRadius: "10px",
            fontWeight: "700",
          }}
        >
          Call 95425 68978
        </a>

        <p
          style={{
            margin: "18px 0 0",
            fontSize: "12px",
            color: "#88765c",
          }}
        >
          Trusted Gold Buyers • Fair Valuation •
          Quick Assistance
        </p>
      </div>
    </div>
  );
};

// =========================================
// PUBLIC WEBSITE LAYOUT
// =========================================

const PublicLayout = ({ children }) => {
  return (
    <>
      <Navbar />

      <main>{children}</main>

      <Footer />

      <WhatsAppButton />

      <WebsiteEntryPopup />
    </>
  );
};

// =========================================
// MAIN APP
// =========================================

function App() {
  useEffect(() => {
    captureAdTracking();
  }, []);

  return (
    <BrowserRouter>
      <Routes>

        {/* =====================================
            PUBLIC WEBSITE
        ===================================== */}

        <Route
          path="/"
          element={
            <PublicLayout>
              <Home />
            </PublicLayout>
          }
        />

        <Route
          path="/gold-rates"
          element={
            <PublicLayout>
              <GoldRates />
            </PublicLayout>
          }
        />

        <Route
          path="/calculator"
          element={
            <PublicLayout>
              <GoldCalculatorPage />
            </PublicLayout>
          }
        />

        <Route
          path="/services"
          element={
            <PublicLayout>
              <Services />
            </PublicLayout>
          }
        />

        <Route
          path="/about"
          element={
            <PublicLayout>
              <About />
            </PublicLayout>
          }
        />

        <Route
          path="/contact"
          element={
            <PublicLayout>
              <Contact />
            </PublicLayout>
          }
        />

        <Route
          path="/branch"
          element={
            <PublicLayout>
              <Branch />
            </PublicLayout>
          }
        />

        <Route
          path="/faq"
          element={
            <PublicLayout>
              <FAQ />
            </PublicLayout>
          }
        />

        <Route
          path="/appointment"
          element={
            <PublicLayout>
              <Appoinment />
            </PublicLayout>
          }
        />

        <Route
          path="/blog"
          element={
            <PublicLayout>
              <Blog />
            </PublicLayout>
          }
        />

        <Route
          path="/blog/:slug"
          element={
            <PublicLayout>
              <BlogDetails />
            </PublicLayout>
          }
        />

        {/* =====================================
            ADMIN LOGIN
            NOT PROTECTED
        ===================================== */}

        <Route
          path="/admin/login"
          element={<AdminLogin />}
        />

        {/* =====================================
            PROTECTED ADMIN AREA
        ===================================== */}

        <Route element={<ProtectedRoute />}>

          {/* Dashboard */}
          <Route
            path="/admin"
            element={<AdminDashboard />}
          />

          {/* Leads */}
          <Route
            path="/admin/leads"
            element={<AdminLeads />}
          />

          {/* Gold Valuations */}
          <Route
            path="/admin/valuations"
            element={<AdminValuations />}
          />

          {/* Enquiries */}
          <Route
            path="/admin/enquiries"
            element={<EnquiryManagement />}
          />

          {/* Appointments */}
          <Route
            path="/admin/appointments"
            element={<AdminAppointments />}
          />

          {/* Gold Rates */}
          <Route
            path="/admin/gold-rates"
            element={<GoldRateManagement />}
          />

          {/* Branches */}
          <Route
            path="/admin/branches"
            element={<BranchManagement />}
          />

          {/* Blog */}
          <Route
            path="/admin/blog"
            element={<AdminBlog />}
          />

        </Route>

        {/* =====================================
            FALLBACK
        ===================================== */}

        <Route
          path="*"
          element={
            <PublicLayout>
              <Home />
            </PublicLayout>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;