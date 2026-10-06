import { Link, NavLink } from "react-router-dom";
import {
  FaPhone,
  FaBars,
  FaTimes,
  FaUser,
} from "react-icons/fa";
import { useState } from "react";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="sl-navbar">
      <div className="sl-navbar-container">

        {/* Logo */}
        <Link
          to="/"
          className="sl-logo"
          onClick={closeMenu}
        >
          <span className="sl-logo-main">SL</span>

          <span className="sl-logo-text">
            Suvarna Lakshmi Gold Buyers
          </span>
        </Link>

        {/* Mobile Menu Button */}
        <button
          className="sl-menu-button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Navigation */}
        <div
          className={`sl-nav-menu ${
            menuOpen ? "sl-nav-open" : ""
          }`}
        >

          {/* Home */}
          <NavLink
            to="/"
            className={({ isActive }) =>
              `sl-nav-link ${isActive ? "sl-active" : ""}`
            }
            onClick={closeMenu}
          >
            Home
          </NavLink>

          {/* Gold Rates */}
          <NavLink
            to="/gold-rates"
            className={({ isActive }) =>
              `sl-nav-link ${isActive ? "sl-active" : ""}`
            }
            onClick={closeMenu}
          >
            Gold Rates
          </NavLink>

          {/* Calculator */}
          <NavLink
            to="/calculator"
            className={({ isActive }) =>
              `sl-nav-link ${isActive ? "sl-active" : ""}`
            }
            onClick={closeMenu}
          >
            Calculator
          </NavLink>

          {/* Services */}
          <NavLink
            to="/services"
            className={({ isActive }) =>
              `sl-nav-link ${isActive ? "sl-active" : ""}`
            }
            onClick={closeMenu}
          >
            Services
          </NavLink>

          {/* About */}
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `sl-nav-link ${isActive ? "sl-active" : ""}`
            }
            onClick={closeMenu}
          >
            About
          </NavLink>

          {/* Blog */}
          <NavLink
            to="/blog"
            className={({ isActive }) =>
              `sl-nav-link ${isActive ? "sl-active" : ""}`
            }
            onClick={closeMenu}
          >
            Blog
          </NavLink>

          {/* Contact */}
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `sl-nav-link ${isActive ? "sl-active" : ""}`
            }
            onClick={closeMenu}
          >
            Contact
          </NavLink>

          {/* Appointment */}
          <NavLink
            to="/appointment"
            className={({ isActive }) =>
              `sl-nav-link ${isActive ? "sl-active" : ""}`
            }
            onClick={closeMenu}
          >
            Appointment
          </NavLink>

          {/* Login */}
          <NavLink
            to="/admin/login"
            className={({ isActive }) =>
              `sl-nav-link sl-login-link ${
                isActive ? "sl-active" : ""
              }`
            }
            onClick={closeMenu}
          >
            <FaUser />
            <span>Login</span>
          </NavLink>

          {/* Phone Button */}
          <a
            href="tel:+919542568978"
            className="sl-call-button"
            onClick={closeMenu}
          >
            <FaPhone />
            <span>Call Us</span>
          </a>

        </div>
      </div>
    </nav>
  );
}

export default Navbar;