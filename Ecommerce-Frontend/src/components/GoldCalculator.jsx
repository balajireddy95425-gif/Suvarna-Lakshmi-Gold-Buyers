import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { useSearchParams } from "react-router-dom";

import { useApp } from "../Context/Context";
import api from "../services/api";
import { getAdTracking } from "../utils/adTracking";

const GoldCalculator = () => {
  const { rates } = useApp();

  // =========================================
  // READ PURITY FROM URL
  // =========================================

  const [searchParams] = useSearchParams();

  const urlPurity = searchParams.get("purity");

  const validPurities = [
    "24k",
    "22k",
    "18k",
  ];

  const startingPurity =
    validPurities.includes(urlPurity)
      ? urlPurity
      : "22k";

  // =========================================
  // FORM STATES
  // =========================================

  const [purity, setPurity] =
    useState(startingPurity);

  const [weight, setWeight] =
    useState("");

  const [name, setName] =
    useState("");

  const [phone, setPhone] =
    useState("");

  // =========================================
  // REFERENCE FOR CUSTOMER SECTION
  // =========================================

  const customerSectionRef =
    useRef(null);

  // =========================================
  // APPLICATION STATES
  // =========================================

  const [loading, setLoading] =
    useState(false);

  const [showResult, setShowResult] =
    useState(false);

  const [error, setError] =
    useState("");

  const [successMessage, setSuccessMessage] =
    useState("");

  // =========================================
  // UPDATE PURITY FROM URL
  // =========================================

  useEffect(() => {
    if (validPurities.includes(urlPurity)) {
      setPurity(urlPurity);
      setShowResult(false);
      setSuccessMessage("");
      setError("");
    }
  }, [urlPurity]);

  // =========================================
  // GET GOLD RATE
  // =========================================

  const rate = useMemo(() => {
    if (!rates) {
      return 0;
    }

    switch (purity) {
      case "24k":
        return Number(rates.gold24k || 0);

      case "22k":
        return Number(rates.gold22k || 0);

      case "18k":
        return Number(rates.gold18k || 0);

      default:
        return 0;
    }
  }, [rates, purity]);

  // =========================================
  // ESTIMATED VALUE
  // =========================================

  const estimatedValue =
    Number(weight || 0) * rate;

  // =========================================
  // FORMAT VALUES
  // =========================================

  const formattedRate =
    rate.toLocaleString("en-IN");

  const formattedValue =
    estimatedValue.toLocaleString(
      "en-IN",
      {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }
    );

  // =========================================
  // HIDE RESULT
  // =========================================

  const hideResult = () => {
    setShowResult(false);
    setSuccessMessage("");
    setError("");
  };

  // =========================================
  // SCROLL TO CUSTOMER SECTION
  // =========================================

  const scrollToCustomerSection = () => {
    setTimeout(() => {
      customerSectionRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }, 50);
  };

  // =========================================
  // SUBMIT FORM
  // =========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccessMessage("");

    const trimmedName =
      name.trim();

    const trimmedPhone =
      phone.trim();

    // =======================================
    // NAME + PHONE VALIDATION
    // =======================================

    // BOTH EMPTY
    if (
      !trimmedName &&
      !trimmedPhone
    ) {
      setError(
        "Please enter your name and mobile number to unlock your gold result."
      );

      setShowResult(false);

      scrollToCustomerSection();

      return;
    }

    // NAME EMPTY
    if (!trimmedName) {
      setError(
        "Please enter your name to unlock your gold result."
      );

      setShowResult(false);

      scrollToCustomerSection();

      return;
    }

    // INVALID NAME
    if (trimmedName.length < 2) {
      setError(
        "Please enter a valid name."
      );

      setShowResult(false);

      scrollToCustomerSection();

      return;
    }

    // PHONE EMPTY
    if (!trimmedPhone) {
      setError(
        "Please enter your mobile number to unlock your gold result."
      );

      setShowResult(false);

      scrollToCustomerSection();

      return;
    }

    // INVALID PHONE
    if (
      !/^[0-9]{10}$/.test(trimmedPhone)
    ) {
      setError(
        "Please enter a valid 10-digit mobile number."
      );

      setShowResult(false);

      scrollToCustomerSection();

      return;
    }

    // =======================================
    // WEIGHT VALIDATION
    // =======================================

    if (
      !weight ||
      Number(weight) <= 0
    ) {
      setError(
        "Please enter a valid gold weight."
      );

      setShowResult(false);

      return;
    }

    // =======================================
    // RATE VALIDATION
    // =======================================

    if (
      !rate ||
      rate <= 0
    ) {
      setError(
        "Gold rate is currently unavailable. Please try again later."
      );

      setShowResult(false);

      return;
    }

    // =======================================
    // SEND DATA TO BACKEND
    // =======================================

    try {
      setLoading(true);

      const goldType =
        purity === "24k"
          ? "24K Gold"
          : purity === "22k"
          ? "22K Gold"
          : "18K Gold";

      // =======================================
      // GOOGLE ADS TRACKING
      // =======================================

      const adTracking =
        getAdTracking();

      const payload = {
        name: trimmedName,
        phone: trimmedPhone,
        goldType: goldType,
        weight: Number(weight),

        // Google Ads tracking
        campaignId:
          adTracking.campaignId,

        adGroupId:
          adTracking.adGroupId,

        keyword:
          adTracking.keyword,

        gclid:
          adTracking.gclid,
      };

      console.log(
        "Gold calculation submission:",
        payload
      );

      await api.post(
        "/gold-calculations",
        payload
      );

      // =====================================
      // SHOW RESULT ONLY AFTER SUCCESS
      // =====================================

      setShowResult(true);

      setSuccessMessage(
        "Your gold valuation has been generated successfully."
      );
    } catch (err) {
      console.error(
        "Valuation submission failed:",
        err
      );

      if (err.response) {
        console.error(
          "Server response:",
          err.response.data
        );

        console.error(
          "Status:",
          err.response.status
        );
      }

      setShowResult(false);

      setError(
        "Unable to submit your valuation request. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================================
  // PAGE
  // =========================================

  return (
    <section className="professional-gold-calculator">

      {/* =====================================
          HEADER
      ====================================== */}

      <div className="gold-calculator-heading">

        <span>
          Suvarna Lakshmi Gold Buyers
        </span>

        <h1>
          Know what your gold
          <br />
          <strong>
            could be worth
          </strong>
        </h1>

        <p>
          Enter your gold details and contact
          information to get your indicative
          gold valuation.
        </p>

      </div>

      <div className="gold-calculator-main">

        {/* =====================================
            STEP 1 - PURITY
        ====================================== */}

        <div className="calculator-section">

          <div className="calculator-section-title">

            <span className="calculator-step-number">
              01
            </span>

            <div>

              <small>
                SELECT PURITY
              </small>

              <h2>
                What type of gold do you have?
              </h2>

            </div>

          </div>

          <div className="purity-selection">

            {/* 24K */}

            <button
              type="button"
              className={`purity-option ${
                purity === "24k"
                  ? "active"
                  : ""
              }`}
              onClick={() => {
                setPurity("24k");
                hideResult();
              }}
            >
              <strong>
                24K
              </strong>

              <span>
                Pure Gold
              </span>
            </button>

            {/* 22K */}

            <button
              type="button"
              className={`purity-option ${
                purity === "22k"
                  ? "active"
                  : ""
              }`}
              onClick={() => {
                setPurity("22k");
                hideResult();
              }}
            >
              <strong>
                22K
              </strong>

              <span>
                Jewellery Gold
              </span>
            </button>

            {/* 18K */}

            <button
              type="button"
              className={`purity-option ${
                purity === "18k"
                  ? "active"
                  : ""
              }`}
              onClick={() => {
                setPurity("18k");
                hideResult();
              }}
            >
              <strong>
                18K
              </strong>

              <span>
                Jewellery Gold
              </span>
            </button>

          </div>

        </div>

        {/* =====================================
            STEP 2 - GOLD WEIGHT
        ====================================== */}

        <div className="calculator-section">

          <div className="calculator-section-title">

            <span className="calculator-step-number">
              02
            </span>

            <div>

              <small>
                GOLD WEIGHT
              </small>

              <h2>
                How much gold do you have?
              </h2>

            </div>

          </div>

          <div className="weight-input-wrapper">

            <input
              type="number"
              min="0"
              step="0.01"
              placeholder="0.00"
              value={weight}
              onChange={(e) => {
                setWeight(e.target.value);
                hideResult();
              }}
            />

            <span>
              GRAMS
            </span>

          </div>

        </div>

        {/* =====================================
            STEP 3 - CUSTOMER DETAILS
        ====================================== */}

        <form
          className="valuation-form"
          onSubmit={handleSubmit}
        >

          {/* CUSTOMER SECTION REF */}

          <div
            ref={customerSectionRef}
            className="customer-details-section"
          >

            <div className="calculator-section-title">

              <span className="calculator-step-number">
                03
              </span>

              <div>

                <small>
                  UNLOCK YOUR RESULT
                </small>

                <h2>
                  Enter your details
                </h2>

              </div>

            </div>

            {/* =================================
                CUSTOMER FIELDS
            ================================== */}

            <div className="customer-fields">

              {/* NAME */}

              <div className="customer-field">

                <label>
                  FULL NAME
                </label>

                <input
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    hideResult();
                  }}
                />

              </div>

              {/* MOBILE */}

              <div className="customer-field">

                <label>
                  MOBILE NUMBER
                </label>

                <input
                  type="tel"
                  inputMode="numeric"
                  maxLength="10"
                  placeholder="10-digit mobile number"
                  value={phone}
                  onChange={(e) => {
                    setPhone(
                      e.target.value.replace(
                        /\D/g,
                        ""
                      )
                    );

                    hideResult();
                  }}
                />

              </div>

            </div>

            {/* =================================
                ERROR MESSAGE
            ================================== */}

            {error && (
              <div className="calculator-error">
                {error}
              </div>
            )}

            {/* =================================
                LOCKED MESSAGE
            ================================== */}

            {!showResult && !error && (
              <div className="rate-unlock-message">

                <div className="rate-unlock-icon">
                  🔒
                </div>

                <div>

                  <strong>
                    Gold result is locked
                  </strong>

                  <p>
                    Enter your name and mobile
                    number, enter your gold weight,
                    and click{" "}

                    <strong>
                      GET MY GOLD VALUATION
                    </strong>

                    {" "}to unlock your gold rate
                    and estimated value.
                  </p>

                </div>

              </div>
            )}

          </div>

          {/* =====================================
              RESULT PANEL
          ====================================== */}

          <div className="calculator-result-panel">

            {!showResult ? (

              /* LOCKED RESULT */

              <div className="rate-locked-panel">

                <div className="big-lock">
                  🔒
                </div>

                <small>
                  TODAY'S GOLD RATE
                </small>

                <h3>
                  Locked
                </h3>

                <p>
                  Submit your details to view
                  today's buying rate and your
                  estimated gold value.
                </p>

              </div>

            ) : (

              /* UNLOCKED RESULT */

              <>

                {/* TODAY'S BUYING RATE */}

                <div className="today-rate">

                  <div>

                    <small>
                      TODAY'S BUYING RATE
                    </small>

                    <div className="rate-number">

                      ₹{formattedRate}

                      <span>
                        / gram
                      </span>

                    </div>

                  </div>

                  <div className="live-rate">

                    <span></span>

                    LIVE RATE

                  </div>

                </div>

                {/* DIVIDER */}

                <div className="result-divider"></div>

                {/* ESTIMATED VALUE */}

                <div className="estimated-value">

                  <small>
                    ESTIMATED GOLD VALUE
                  </small>

                  <div className="estimated-number">
                    ₹{formattedValue}
                  </div>

                  <p>
                    Based on {weight}g of{" "}
                    {purity.toUpperCase()} gold
                  </p>

                </div>

              </>

            )}

          </div>

          {/* =====================================
              NOTICE
          ====================================== */}

          <div className="calculator-notice">

            <div className="notice-icon">
              ₹
            </div>

            <div>

              <strong>
                Transparent Gold Valuation
              </strong>

              <p>
                This is an indicative estimate
                based on the buying rate. Final
                value may vary after physical testing,
                purity verification, weight
                verification and applicable
                deductions.
              </p>

            </div>

          </div>

          {/* =====================================
              SUBMIT BUTTON
          ====================================== */}

          <button
            type="submit"
            className="valuation-button"
            disabled={
              loading || showResult
            }
          >

            {loading
              ? "PROCESSING..."
              : showResult
              ? "VALUATION GENERATED ✓"
              : "GET MY GOLD VALUATION"}

            <span>
              →
            </span>

          </button>

          {/* =====================================
              SUCCESS MESSAGE
          ====================================== */}

          {successMessage && (
            <div className="rate-unlocked-message">

              <span>
                ✓
              </span>

              {successMessage}

            </div>
          )}

          {/* SECURITY TEXT */}

          <p className="valuation-security">
            Your information is securely submitted
            to Suvarna Lakshmi Gold Buyers for valuation
            follow-up.
          </p>

        </form>

      </div>

    </section>
  );
};

export default GoldCalculator;