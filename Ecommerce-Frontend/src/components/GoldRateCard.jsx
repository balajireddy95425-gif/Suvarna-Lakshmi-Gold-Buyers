import React from "react";
import { Link } from "react-router-dom";

const GoldRateCard = ({
  title,
  rate,
  purity,
  subtitle = "per gram",
}) => {
  const numericRate = Number(rate || 0);

  return (
    <div className="professional-gold-rate-card">

      <div className="gold-rate-card-top">
        <div className="gold-rate-purity">
          {purity}
        </div>

        <span className="gold-rate-status">
          TODAY
        </span>
      </div>

      <div className="gold-rate-card-content">

        <p className="gold-rate-label">
          CURRENT GOLD RATE
        </p>

        <h2>{title}</h2>

        <div className="gold-rate-value">
          ₹{numericRate.toLocaleString("en-IN")}
        </div>

        <p className="gold-rate-per">
          {subtitle}
        </p>

      </div>

      <div className="gold-rate-card-footer">
        <span>✓ Live rate</span>
        <span>Updated today</span>
      </div>

      {/* CALCULATOR BUTTON */}
      <div className="gold-rate-card-action">
        <Link
          to={`/calculator?purity=${purity.toLowerCase()}`}
          className="gold-rate-calculate-button"
        >
          Calculate with {purity} →
        </Link>
      </div>

    </div>
  );
};

export default GoldRateCard;