import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaChevronDown,
  FaQuestionCircle,
  FaPhone,
  FaWhatsapp,
} from "react-icons/fa";

function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question:
        "How can I sell my gold to Suvarna Lakshmi Gold Buyers?",
      answer:
        "You can contact Suvarna Lakshmi Gold Buyers through the Contact Us page, phone or WhatsApp. You can also submit an enquiry through the online enquiry form with your name, phone number and gold details.",
    },
    {
      question:
        "How is the value of my gold calculated?",
      answer:
        "The approximate value of your gold is calculated based on its purity, weight and the applicable gold rate. The final value is determined after the gold is physically evaluated.",
    },
    {
      question:
        "What gold purities are supported?",
      answer:
        "The website currently provides calculations for 24K, 22K and 18K gold. The actual purity of your jewellery or gold item will be determined during the physical evaluation.",
    },
    {
      question:
        "Can I check the current gold rate on the website?",
      answer:
        "Yes. You can visit the Gold Rates page to see the latest gold rates available on the website. The rates are displayed per gram.",
    },
    {
      question:
        "Can I calculate the approximate value of my gold online?",
      answer:
        "Yes. Use our Gold Calculator. Select the purity of your gold, enter the weight in grams and the calculator will provide an approximate value based on the available rate.",
    },
    {
      question:
        "Is the amount shown by the gold calculator final?",
      answer:
        "No. The calculator provides only an approximate estimate. The final valuation can depend on the actual purity, weight and physical evaluation of the gold.",
    },
    {
      question:
        "Can I submit an enquiry online?",
      answer:
        "Yes. Go to the Contact Us page and complete the enquiry form. Enter your name, phone number, email, gold details and message, then submit the form.",
    },
    {
      question:
        "What information should I provide in an enquiry?",
      answer:
        "It is helpful to provide your name, phone number, email address, gold type, approximate weight and any additional message or information you would like to share.",
    },
    {
      question:
        "Do I need to visit the branch?",
      answer:
        "For an accurate final valuation, the gold generally needs to be physically evaluated. You can contact the business first to discuss your enquiry and the next steps.",
    },
    {
      question:
        "Where is Suvarna Lakshmi Gold Buyers located?",
      answer:
        "Our current branch is located at 11, 1st Cross, Lingadhiranahalli, Andrahalli Main Road, Near Royal Mart, Bengaluru, Karnataka - 560091, India.",
    },
    {
      question:
        "How can I contact Suvarna Lakshmi Gold Buyers?",
      answer:
        "You can contact Suvarna Lakshmi Gold Buyers by phone or WhatsApp using the contact details provided below.",
    },
    {
      question:
        "Can I use WhatsApp to contact the business?",
      answer:
        "Yes. The website includes a WhatsApp contact option. Clicking it opens WhatsApp so you can start a conversation.",
    },
  ];

  const toggleFAQ = (index) => {
    if (openIndex === index) {
      setOpenIndex(null);
    } else {
      setOpenIndex(index);
    }
  };

  return (
    <div className="faq-page">

      {/* =========================
          PAGE HEADER
      ========================== */}
      <section className="page-header">
        <div className="container">
          <div className="faq-header-content">

            <div className="faq-header-icon">
              <FaQuestionCircle />
            </div>

            <h1>
              Frequently Asked Questions
            </h1>

            <p>
              Find answers to common questions about
              selling gold and our services.
            </p>

          </div>
        </div>
      </section>

      {/* =========================
          FAQ INTRODUCTION
      ========================== */}
      <section className="section-padding">
        <div className="container">

          <div className="faq-intro">

            <span className="section-label">
              FAQ
            </span>

            <h2>
              How Can We Help You?
            </h2>

            <p>
              We understand that selling gold can raise
              several questions. Below are some commonly
              asked questions about gold rates, valuation,
              the calculator and our enquiry process.
            </p>

          </div>

          {/* =========================
              FAQ LIST
          ========================== */}
          <div className="faq-list">

            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;

              return (
                <div
                  className={`faq-item ${
                    isOpen ? "faq-item-open" : ""
                  }`}
                  key={index}
                >

                  {/* QUESTION */}
                  <button
                    type="button"
                    className="faq-question"
                    onClick={() => toggleFAQ(index)}
                    aria-expanded={isOpen}
                  >

                    <span className="faq-question-left">

                      <span className="faq-number">
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <span className="faq-question-text">
                        {faq.question}
                      </span>

                    </span>

                    <span
                      className={`faq-arrow ${
                        isOpen
                          ? "faq-arrow-open"
                          : ""
                      }`}
                    >
                      <FaChevronDown />
                    </span>

                  </button>

                  {/* ANSWER */}
                  {isOpen && (
                    <div className="faq-answer">

                      <div className="faq-answer-inner">
                        <p>
                          {faq.answer}
                        </p>
                      </div>

                    </div>
                  )}

                </div>
              );
            })}

          </div>

        </div>
      </section>

      {/* =========================
          GOLD CALCULATOR CTA
      ========================== */}
      <section className="faq-calculator-section">

        <div className="container">

          <div className="faq-cta-card">

            <div className="faq-cta-icon">
              💰
            </div>

            <div className="faq-cta-content">

              <h2>
                Want to Know Your Gold Value?
              </h2>

              <p>
                Use our gold calculator to get an
                approximate value based on purity,
                weight and the available gold rate.
              </p>

              <Link
                to="/calculator"
                className="btn btn-warning"
              >
                Calculate Gold Value
              </Link>

            </div>

          </div>

        </div>

      </section>

      {/* =========================
          CONTACT CTA
      ========================== */}
      <section className="section-padding bg-light">

        <div className="container">

          <div className="faq-contact-section">

            <span className="section-label">
              Still Have Questions?
            </span>

            <h2>
              Contact Suvarna Lakshmi Gold Buyers
            </h2>

            <p>
              If you could not find the answer you are
              looking for, contact us directly.
            </p>

            <div className="faq-contact-buttons">

              {/* CALL */}
              <a
                href="tel:+919542568978"
                className="btn btn-dark"
              >
                <FaPhone className="me-2" />
                Call Us
              </a>

              {/* WHATSAPP */}
              <a
                href="https://wa.me/919542568978"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-success"
              >
                <FaWhatsapp className="me-2" />
                WhatsApp Us
              </a>

              {/* ENQUIRY */}
              <Link
                to="/contact"
                className="btn btn-warning"
              >
                Send Enquiry
              </Link>

            </div>

          </div>

        </div>

      </section>

    </div>
  );
}

export default FAQ;