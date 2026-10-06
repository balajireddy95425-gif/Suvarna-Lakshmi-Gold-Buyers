import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import GoldRateCard from "../components/GoldRateCard";
import GoldCalculator from "../components/GoldCalculator";
import EnquiryForm from "../components/EnquiryForm";
import Service from "../components/Service";
import { useApp } from "../Context/Context";

function Home() {
  const { rates, loadingRates } = useApp();
    const [currentSlide, setCurrentSlide] = useState(0);

  const heroImages = [
    "/images/images1.jpg",
    "/images/images2.jpg",
    "/images/images3.jpg",
    "/images/images4.jpg",
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) =>
        prev === heroImages.length - 1 ? 0 : prev + 1
      );
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const previousSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? heroImages.length - 1 : prev - 1
    );
  };

  const nextSlide = () => {
    setCurrentSlide((prev) =>
      prev === heroImages.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <>
      {/* Hero Section */}
<section
  className="hero-section"
  style={{
    backgroundImage: `url(${heroImages[currentSlide]})`,
  }}
  
>
  <div className="hero-overlay">
    <button
  className="hero-slider-arrow hero-slider-left"
  onClick={previousSlide}
>
  <FaChevronLeft />
</button>

<button
  className="hero-slider-arrow hero-slider-right"
  onClick={nextSlide}
>
  <FaChevronRight />
</button>
  </div>

  <div className="container">
          <div className="row align-items-center">

            <div className="col-lg-7">
              <span className="hero-badge">
                Trusted Gold Buyers
              </span>

              <h1 className="hero-title">
                Sell Your Gold
                <br />
                <span>Get the Right Value</span>
              </h1>

              <p className="hero-text">
                Suvarna Lakshmi Gold Buyers offers a simple,
                transparent and convenient way to sell
                your gold at competitive market rates.
              </p>

              <div className="hero-buttons">
                <Link
                  to="/contact"
                  className="btn btn-warning btn-lg me-2"
                >
                  Sell Your Gold
                </Link>

                <Link
                  to="/gold-rates"
                  className="btn btn-outline-light btn-lg"
                >
                  Check Gold Rates
                </Link>
              </div>
            </div>

            <div className="col-lg-5 mt-5 mt-lg-0">
              <div className="hero-gold-card">
                <div className="gold-symbol">
                  Au
                </div>

                <h3>
                  Your Gold Has Value
                </h3>

                <p>
                  Get an estimate based on today's
                  gold rate and your gold weight.
                </p>

                <Link
                  to="/calculator"
                  className="btn btn-warning"
                >
                  Calculate Value
                </Link>
              </div>
            </div>

          </div>
        </div>
        <button
  className="hero-slider-arrow hero-slider-left"
  onClick={previousSlide}
>
  <FaChevronLeft />
</button>

<button
  className="hero-slider-arrow hero-slider-right"
  onClick={nextSlide}
>
  <FaChevronRight />
</button>
      </section>

      {/* Gold Rates */}
      <section className="section-padding">
        <div className="container">

          <div className="section-heading">
            <span>Today's Rates</span>

            <h2>
              Current Gold Rates
            </h2>

            <p>
              Check our latest gold rates before
              selling your gold.
            </p>
          </div>

          {loadingRates ? (
            <div className="text-center">
              <div className="spinner-border text-warning" />
            </div>
          ) : rates ? (
            <div className="row justify-content-center">

              <div className="col-md-4 mb-3">
                <GoldRateCard
  purity="24K"
  rate={rates.gold24k}
/>
              </div>

              <div className="col-md-4 mb-3">
               <GoldRateCard
  purity="22K"
  rate={rates.gold22k}
/>
              </div>

              <div className="col-md-4 mb-3">
               <GoldRateCard
  purity="18K"
  rate={rates.gold18k}
/>
              </div>

            </div>
          ) : (
           <div className="home-gold-rates">

  <div className="home-rate-card">
    <div className="rate-purity">24K</div>

    <h3>₹8,500</h3>

    <p>per gram</p>

    <span>Pure Gold</span>
  </div>

  <div className="home-rate-card">
    <div className="rate-purity">22K</div>

    <h3>₹7,800</h3>

    <p>per gram</p>

    <span>Standard Gold</span>
  </div>

  <div className="home-rate-card">
    <div className="rate-purity">18K</div>

    <h3>₹6,400</h3>

    <p>per gram</p>

    <span>Jewellery Gold</span>
  </div>

</div>
          )}

          <div className="text-center mt-3">
            <Link
              to="/gold-rates"
              className="btn btn-outline-warning"
            >
              View All Rates
            </Link>
          </div>

        </div>
      </section>

      {/* Why Us */}
      <section className="section-padding bg-light">
        <div className="container">

          <div className="section-heading">
            <span>Why Choose Us</span>

            <h2>
              A Simple Way to Sell Your Gold
            </h2>
          </div>

          <div className="row g-4">

            <div className="col-md-4">
              <div className="feature-card">
                <div className="feature-icon">
                  💰
                </div>

                <h4>
                  Transparent Pricing
                </h4>

                <p>
                  We provide clear pricing based on
                  gold purity, weight and applicable
                  market rates.
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="feature-card">
                <div className="feature-icon">
                  ⚖️
                </div>

                <h4>
                  Accurate Evaluation
                </h4>

                <p>
                  Your gold is evaluated carefully
                  based on its purity and weight.
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="feature-card">
                <div className="feature-icon">
                  🤝
                </div>

                <h4>
                  Customer Friendly
                </h4>

                <p>
                  Our process is designed to be
                  simple, convenient and easy to
                  understand.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Services */}
      <section className="section-padding">
        <div className="container">

          <div className="section-heading">
            <span>Our Services</span>

            <h2>
              What We Offer
            </h2>
          </div>

          <div className="row g-4">

            <div className="col-md-4">
              <Service
                icon="💰"
                title="Gold Buying"
                description="Sell your gold jewellery and receive a transparent valuation."
              />
            </div>

            <div className="col-md-4">
              <Service
                icon="📊"
                title="Gold Valuation"
                description="Get an estimate based on purity, weight and current rates."
              />
            </div>

            <div className="col-md-4">
              <Service
                icon="📅"
                title="Easy Enquiry"
                description="Submit your details and our team can get in touch with you."
              />
            </div>

          </div>

          <div className="text-center mt-4">
            <Link
              to="/services"
              className="btn btn-warning"
            >
              Explore Services
            </Link>
          </div>

        </div>
      </section>

      {/* Calculator */}
      <section className="section-padding calculator-home-section">
        <div className="container">

          <div className="section-heading">
            <span>Gold Calculator</span>

            <h2>
              Estimate Your Gold Value
            </h2>

            <p>
              Enter your gold purity and weight to
              calculate an approximate value.
            </p>
          </div>

          <GoldCalculator />

        </div>
      </section>

      {/* Enquiry */}
      <section className="section-padding bg-light">
        <div className="container">

          <div className="section-heading">
            <span>Get in Touch</span>

            <h2>
              Interested in Selling Your Gold?
            </h2>

            <p>
              Submit your details and send us an enquiry.
            </p>
          </div>

          <div className="row justify-content-center">
            <div className="col-lg-8">
              <EnquiryForm />
            </div>
          </div>

        </div>
      </section>
    </>
  );
}

export default Home;