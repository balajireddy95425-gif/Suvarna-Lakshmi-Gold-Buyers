import React from "react";
import { Link } from "react-router-dom";
import { useApp } from "../Context/Context";
import Loading from "../components/Loading";

function GoldRates() {
  const { rates, loadingRates } = useApp();

  // Use only rates received from the backend.
  const gold24k = Number(rates?.gold24k);
  const gold22k = Number(rates?.gold22k);
  const gold18k = Number(rates?.gold18k);

  const has24k = Number.isFinite(gold24k) && gold24k > 0;
  const has22k = Number.isFinite(gold22k) && gold22k > 0;
  const has18k = Number.isFinite(gold18k) && gold18k > 0;

  const hasAnyRate = has24k || has22k || has18k;

  if (loadingRates) {
    return (
      <section className="professional-gold-rates-page">
        <div className="gold-rates-container">
          <div className="gold-rates-loading">
            <Loading />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="professional-gold-rates-page">
      <div className="gold-rates-container">

        {/* HEADER */}
        <div className="gold-rates-header">
          <span className="gold-rates-eyebrow">
            Suvarna Lakshmi Gold Buyers
          </span>

          <h1>Today's Gold Rates</h1>

          <p>
            Check our latest gold buying rates per gram.
            Select a purity to calculate your estimated gold value.
          </p>
        </div>

        {!hasAnyRate ? (
          /* NO RATES AVAILABLE */
          <div className="gold-rates-information">
            <div className="gold-info-icon">
              ₹
            </div>

            <div>
              <h3>Gold rates currently unavailable</h3>

              <p>
                We are unable to display the current gold rates right now.
                Please contact Suvarna Lakshmi Gold Buyers for the latest
                buying rate.
              </p>

              <a
                href="tel:+919542568978"
                className="gold-rate-calculate-button"
              >
                Call +91 95425 68978
              </a>
            </div>
          </div>
        ) : (
          <>
            {/* GOLD RATE CARDS */}
            <div className="professional-rate-grid">

              {/* 24K */}
              <div className="professional-gold-rate-card">

                <div className="gold-rate-card-top">
                  <div className="gold-rate-purity">
                    24K
                  </div>

                  <span className="gold-rate-status">
                    TODAY
                  </span>
                </div>

                <div className="gold-rate-card-content">

                  <p className="gold-rate-label">
                    CURRENT GOLD RATE
                  </p>

                  <h2>24K Gold</h2>

                  {has24k ? (
                    <>
                      <div className="gold-rate-value">
                        ₹{gold24k.toLocaleString("en-IN")}
                      </div>

                      <p className="gold-rate-per">
                        per gram
                      </p>
                    </>
                  ) : (
                    <div className="gold-rate-value">
                      Rate unavailable
                    </div>
                  )}

                </div>

                <div className="gold-rate-card-footer">
                  <span>
                    {has24k
                      ? "✓ Current rate"
                      : "⚠ Rate unavailable"}
                  </span>

                  <span>
                    24K purity
                  </span>
                </div>

                <Link
                  to="/calculator?purity=24k"
                  className="gold-rate-calculate-button"
                >
                  Calculate with 24K →
                </Link>

              </div>

              {/* 22K */}
              <div className="professional-gold-rate-card">

                <div className="gold-rate-card-top">
                  <div className="gold-rate-purity">
                    22K
                  </div>

                  <span className="gold-rate-status">
                    TODAY
                  </span>
                </div>

                <div className="gold-rate-card-content">

                  <p className="gold-rate-label">
                    CURRENT GOLD RATE
                  </p>

                  <h2>22K Gold</h2>

                  {has22k ? (
                    <>
                      <div className="gold-rate-value">
                        ₹{gold22k.toLocaleString("en-IN")}
                      </div>

                      <p className="gold-rate-per">
                        per gram
                      </p>
                    </>
                  ) : (
                    <div className="gold-rate-value">
                      Rate unavailable
                    </div>
                  )}

                </div>

                <div className="gold-rate-card-footer">
                  <span>
                    {has22k
                      ? "✓ Current rate"
                      : "⚠ Rate unavailable"}
                  </span>

                  <span>
                    22K purity
                  </span>
                </div>

                <Link
                  to="/calculator?purity=22k"
                  className="gold-rate-calculate-button"
                >
                  Calculate with 22K →
                </Link>

              </div>

              {/* 18K */}
              <div className="professional-gold-rate-card">

                <div className="gold-rate-card-top">
                  <div className="gold-rate-purity">
                    18K
                  </div>

                  <span className="gold-rate-status">
                    TODAY
                  </span>
                </div>

                <div className="gold-rate-card-content">

                  <p className="gold-rate-label">
                    CURRENT GOLD RATE
                  </p>

                  <h2>18K Gold</h2>

                  {has18k ? (
                    <>
                      <div className="gold-rate-value">
                        ₹{gold18k.toLocaleString("en-IN")}
                      </div>

                      <p className="gold-rate-per">
                        per gram
                      </p>
                    </>
                  ) : (
                    <div className="gold-rate-value">
                      Rate unavailable
                    </div>
                  )}

                </div>

                <div className="gold-rate-card-footer">
                  <span>
                    {has18k
                      ? "✓ Current rate"
                      : "⚠ Rate unavailable"}
                  </span>

                  <span>
                    18K purity
                  </span>
                </div>

                <Link
                  to="/calculator?purity=18k"
                  className="gold-rate-calculate-button"
                >
                  Calculate with 18K →
                </Link>

              </div>

            </div>

            {/* NOTE */}
            <div className="gold-rates-information">

              <div className="gold-info-icon">
                ₹
              </div>

              <div>

                <h3>
                  Transparent Gold Pricing
                </h3>

                <p>
                  Rates shown are indicative buying rates per gram.
                  Final valuation may vary after physical testing,
                  purity verification and weight verification.
                </p>

              </div>

            </div>

            {/* CALCULATOR CTA */}
            <div className="gold-rate-calculator-cta">

              <div>

                <span>
                  WANT TO KNOW YOUR GOLD VALUE?
                </span>

                <h2>
                  Calculate your estimated gold value
                </h2>

                <p>
                  Choose your gold purity and enter your weight.
                </p>

              </div>

              <Link
                to="/calculator"
                className="gold-rate-cta-button"
              >
                Calculate Now →
              </Link>

            </div>

          </>
        )}

      </div>
    </section>
  );
}

export default GoldRates;