import { useState } from "react";

function Service({ icon, title, description, details }) {
  const [showDetails, setShowDetails] = useState(false);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setShowDetails(true);
    }
  };

  return (
    <>
      {/* Service Card */}
      <div
        className="service-card service-card-clickable"
        role="button"
        tabIndex={0}
        onClick={() => setShowDetails(true)}
        onKeyDown={handleKeyDown}
      >
        <div className="service-icon">
          {icon}
        </div>

        <h3>{title}</h3>

        <p>{description}</p>

        <span className="service-read-more">
          Click to learn more →
        </span>
      </div>

      {/* Service Details Popup */}
      {showDetails && (
        <div
          className="service-modal-overlay"
          onClick={() => setShowDetails(false)}
        >
          <div
            className="service-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="service-modal-close"
              onClick={() => setShowDetails(false)}
              aria-label="Close"
            >
              ×
            </button>

            <div className="service-modal-icon">
              {icon}
            </div>

            <span className="service-modal-label">
              Suvarna Lakshmi Gold Buyers
            </span>

            <h2>{title}</h2>

            <p className="service-modal-intro">
              {description}
            </p>

            {details && (
              <div className="service-modal-details">
                {details.map((item, index) => (
                  <div
                    className="service-detail-item"
                    key={index}
                  >
                    <h4>{item.heading}</h4>

                    <p>{item.text}</p>
                  </div>
                ))}
              </div>
            )}

            <button
              type="button"
              className="service-modal-button"
              onClick={() => setShowDetails(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Service;