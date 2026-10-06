import { useState } from "react";
import { Link } from "react-router-dom";
import "./About.css";

function About() {
  const [selectedValue, setSelectedValue] = useState(null);

  const valueDetails = {
    transparency: {
      icon: "🔍",
      title: "Transparency",
      shortText:
        "Clear information about rates and the gold valuation process.",
      content:
        "At Suvarna Lakshmi Gold Buyers, we aim to make the gold-selling process easy to understand. Customers can review available gold-rate information and learn how the valuation process works before proceeding. The final valuation is determined after physical evaluation of the gold.",
    },

    service: {
      icon: "🤝",
      title: "Customer Service",
      shortText:
        "A convenient experience designed around customer enquiries.",
      content:
        "We focus on making it easy for customers to contact our team, ask questions, request a valuation or arrange an appointment. Our website provides enquiry, calculator and appointment facilities so customers can begin the process conveniently.",
    },

    evaluation: {
      icon: "💎",
      title: "Careful Evaluation",
      shortText:
        "Gold can be evaluated according to purity and weight.",
      content:
        "Gold valuation can depend on factors such as purity and weight. Customers can use the website calculator to understand an indicative value, while the final valuation is determined after the gold is physically evaluated and the relevant details are verified.",
    },
  };

  const openValue = (value) => {
    setSelectedValue(value);
  };

  const closeValue = () => {
    setSelectedValue(null);
  };

  return (
    <div className="page-content">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <section className="page-header">
        <div className="container">

          <h1>
            About Us
          </h1>

          <p>
            Learn more about Suvarna Lakshmi Gold Buyers.
          </p>

        </div>
      </section>


      {/* =====================================================
          ABOUT SECTION
      ===================================================== */}

      <section className="section-padding">
        <div className="container">

          <div className="row align-items-center">

            {/* LEFT */}
            <div className="col-lg-6 mb-4 mb-lg-0">

              <div className="about-gold-box">

                <div className="about-symbol">
                  Au
                </div>

                <h3>
                  Suvarna Lakshmi Gold Buyers
                </h3>

                <p>
                  Trusted Gold Buying Services
                </p>

              </div>

            </div>


            {/* RIGHT */}
            <div className="col-lg-6">

              <span className="section-label">
                About Sri Lakshmi
              </span>

              <h2 className="mb-3">
                A Simple and Transparent
                Gold Selling Experience
              </h2>

              <p>
                Suvarna Lakshmi Gold Buyers is a gold
                buying service focused on providing
                customers with a simple and convenient
                way to understand the value of their
                gold.
              </p>

              <p>
                Our website provides current gold rate
                information, a gold value calculator
                and an enquiry facility so customers
                can get started before visiting the
                branch.
              </p>

              <p>
                Gold valuation can depend on factors
                such as purity and weight. The final
                valuation is determined after the gold
                is physically evaluated.
              </p>

              <Link
                to="/contact"
                className="btn btn-warning mt-2"
              >
                Contact Us
              </Link>

            </div>

          </div>

        </div>
      </section>


      {/* =====================================================
          VALUES
      ===================================================== */}

      <section className="section-padding bg-light">

        <div className="container">

          <div className="section-heading">

            <span>
              Our Values
            </span>

            <h2>
              What We Focus On
            </h2>

          </div>


          <div className="row g-4">


            {/* =================================================
                TRANSPARENCY
            ================================================= */}

            <div className="col-md-4">

              <button
                type="button"
                className="feature-card about-click-card"
                onClick={() =>
                  openValue(
                    valueDetails.transparency
                  )
                }
              >

                <div className="feature-icon">
                  {valueDetails.transparency.icon}
                </div>

                <h4>
                  {valueDetails.transparency.title}
                </h4>

                <p>
                  {valueDetails.transparency.shortText}
                </p>

                <span className="about-read-more">
                  Read More →
                </span>

              </button>

            </div>


            {/* =================================================
                CUSTOMER SERVICE
            ================================================= */}

            <div className="col-md-4">

              <button
                type="button"
                className="feature-card about-click-card"
                onClick={() =>
                  openValue(
                    valueDetails.service
                  )
                }
              >

                <div className="feature-icon">
                  {valueDetails.service.icon}
                </div>

                <h4>
                  {valueDetails.service.title}
                </h4>

                <p>
                  {valueDetails.service.shortText}
                </p>

                <span className="about-read-more">
                  Read More →
                </span>

              </button>

            </div>


            {/* =================================================
                CAREFUL EVALUATION
            ================================================= */}

            <div className="col-md-4">

              <button
                type="button"
                className="feature-card about-click-card"
                onClick={() =>
                  openValue(
                    valueDetails.evaluation
                  )
                }
              >

                <div className="feature-icon">
                  {valueDetails.evaluation.icon}
                </div>

                <h4>
                  {valueDetails.evaluation.title}
                </h4>

                <p>
                  {valueDetails.evaluation.shortText}
                </p>

                <span className="about-read-more">
                  Read More →
                </span>

              </button>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          DETAIL POPUP
      ===================================================== */}

      {selectedValue && (

        <div
          className="about-detail-overlay"
          onClick={closeValue}
        >

          <div
            className="about-detail-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            {/* CLOSE BUTTON */}

            <button
              type="button"
              className="about-detail-close"
              onClick={closeValue}
              aria-label="Close"
            >
              ×
            </button>


            {/* ICON */}

            <div className="about-detail-icon">
              {selectedValue.icon}
            </div>


            {/* LABEL */}

            <span className="about-detail-label">
              Suvarna Lakshmi Gold Buyers
            </span>


            {/* TITLE */}

            <h2>
              {selectedValue.title}
            </h2>


            {/* CONTENT */}

            <p>
              {selectedValue.content}
            </p>


            {/* CLOSE */}

            <button
              type="button"
              className="about-detail-button"
              onClick={closeValue}
            >
              Close
            </button>

          </div>

        </div>

      )}

    </div>
  );
}

export default About;