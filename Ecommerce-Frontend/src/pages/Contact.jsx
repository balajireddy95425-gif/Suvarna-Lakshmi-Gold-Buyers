import EnquiryForm from "../components/EnquiryForm";
import {
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaWhatsapp,
  FaArrowRight,
} from "react-icons/fa";

function Contact() {
  return (
    <main className="professional-contact-page">

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="professional-contact-hero">

        <div className="professional-contact-hero-inner">

          <span className="professional-contact-eyebrow">
            Suvarna Lakshmi Gold Buyers
          </span>

          <h1>
            Let's talk about
            <br />
            <span>your gold.</span>
          </h1>

          <p>
            Have gold to sell or need a valuation?
            Connect with our team and let us help you
            understand your gold's value.
          </p>

        </div>

      </section>

      {/* =====================================================
          MAIN CONTACT SECTION
      ===================================================== */}

      <section className="professional-contact-section">

        <div className="professional-contact-grid">

          {/* =================================================
              LEFT — CONTACT INFORMATION
          ================================================= */}

          <aside className="professional-contact-info">

            <div className="professional-contact-info-content">

              <span className="contact-info-label">
                CONTACT OUR TEAM
              </span>

              <h2>
                Trusted gold buying,
                <br />
                <span>handled professionally.</span>
              </h2>

              <p className="contact-info-description">
                Speak with our team for gold buying
                enquiries, gold valuation assistance,
                appointments and further information.
              </p>

              {/* PHONE */}

              <a
                href="tel:+919542568978"
                className="professional-contact-detail"
              >

                <div className="professional-contact-icon">
                  <FaPhoneAlt />
                </div>

                <div>
                  <small>CALL US</small>

                  <strong>
                    +91 95425 68978
                  </strong>
                </div>

              </a>

              {/* LOCATION */}

              <div className="professional-contact-detail">

                <div className="professional-contact-icon">
                  <FaMapMarkerAlt />
                </div>

                <div>
                  <small>VISIT US</small>

                  <strong>
                    11, 1st Cross, Lingadhiranahalli,
                    Andrahalli Main Road,
                    Near Royal Mart,
                    Bengaluru, Karnataka - 560091
                  </strong>
                </div>

              </div>

              {/* WHATSAPP */}

              <a
                href="https://wa.me/919542568978"
                target="_blank"
                rel="noopener noreferrer"
                className="professional-whatsapp-card"
              >

                <div className="professional-whatsapp-icon">
                  <FaWhatsapp />
                </div>

                <div>
                  <small>QUICK CONTACT</small>

                  <strong>
                    Chat with us on WhatsApp
                  </strong>
                </div>

                <FaArrowRight className="professional-whatsapp-arrow" />

              </a>

            </div>

            {/* BOTTOM TRUST MESSAGE */}

            <div className="professional-contact-trust">

              <span>✓</span>

              Transparent & professional gold valuation

            </div>

          </aside>

          {/* =================================================
              RIGHT — ENQUIRY FORM
          ================================================= */}

          <div className="professional-contact-form">

            <div className="professional-form-header">

              <span>
                GOLD BUYING ENQUIRY
              </span>

              <h2>
                Sell your gold
                <br />
                <strong>with confidence.</strong>
              </h2>

              <p>
                Share your details below and our
                gold buying team will contact you.
              </p>

            </div>

            <EnquiryForm />

          </div>

        </div>

      </section>

    </main>
  );
}

export default Contact;