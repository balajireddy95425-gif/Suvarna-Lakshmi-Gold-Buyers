import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="container py-5">

        <div className="row g-4">

          {/* COMPANY */}
          <div className="col-md-4">

            <h3>
              Suvarna Lakshmi Gold Buyers
            </h3>

            <p>
              Trusted gold buying and valuation
              services with a transparent
              customer-focused process.
            </p>

          </div>

          {/* QUICK LINKS */}
          <div className="col-md-4">

            <h4>
              Quick Links
            </h4>

            <ul className="footer-links">

              <li>
                <Link to="/">
                  Home
                </Link>
              </li>

              <li>
                <Link to="/gold-rates">
                  Gold Rates
                </Link>
              </li>

              <li>
                <Link to="/calculator">
                  Gold Calculator
                </Link>
              </li>

              <li>
                <Link to="/services">
                  Services
                </Link>
              </li>

              <li>
                <Link to="/contact">
                  Contact
                </Link>
              </li>

            </ul>

          </div>

          {/* CONTACT */}
          <div className="col-md-4">

            <h4>
              Contact
            </h4>

            <p>
              Phone:{" "}
              <a href="tel:9542568978">
                +91 95425 68978
              </a>
            </p>

            <p>
              11, 1st Cross, Lingadhiranahalli,
              Andrahalli Main Road,
              Near Royal Mart
            </p>

            <p>
              Bengaluru, Karnataka - 560091,
              India
            </p>

          </div>

        </div>

        <hr />

        <div className="text-center">

          <p className="mb-0">
            © {new Date().getFullYear()}{" "}
            Suvarna Lakshmi Gold Buyers.
            All rights reserved.
          </p>

        </div>

      </div>
    </footer>
  );
};

export default Footer;