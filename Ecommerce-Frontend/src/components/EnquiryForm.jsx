import { useState } from "react";
import { enquiryApi } from "../services/api";
import "./EnquiryForm.css";

const initialForm = {
  name: "",
  phone: "",
  email: "",
  goldType: "22K Gold",
  weight: "",
  location: "",
  message: "",
};

const EnquiryForm = () => {
  const [form, setForm] = useState(initialForm);

  const [loading, setLoading] =
    useState(false);

  const [success, setSuccess] =
    useState("");

  const [error, setError] =
    useState("");


  // =========================================
  // HANDLE INPUT
  // =========================================

  const handleChange = (e) => {

    const { name, value } = e.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));

    setError("");
    setSuccess("");
  };


  // =========================================
  // VALIDATION
  // =========================================

  const validateForm = () => {

    const name = form.name.trim();
    const phone = form.phone.trim();
    const email = form.email.trim();
    const weight = form.weight.trim();

    if (!name) {
      return "Please enter your name.";
    }

    if (!/^[A-Za-z\s.'-]{2,}$/.test(name)) {
      return "Please enter a valid name.";
    }

    if (!phone) {
      return "Please enter your mobile number.";
    }

    if (!/^[0-9]{10}$/.test(phone)) {
      return "Please enter a valid 10-digit mobile number.";
    }

    if (!email) {
      return "Please enter your email address.";
    }

    if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        email
      )
    ) {
      return "Please enter a valid email address.";
    }

    if (!weight) {
      return "Please enter the gold weight.";
    }

    if (
      Number.isNaN(Number(weight)) ||
      Number(weight) <= 0
    ) {
      return "Please enter a valid gold weight.";
    }

    return "";
  };


  // =========================================
  // SUBMIT
  // =========================================

  const handleSubmit = async (e) => {

    e.preventDefault();

    setError("");
    setSuccess("");

    const validationError =
      validateForm();

    if (validationError) {
      setError(validationError);
      return;
    }

    try {

      setLoading(true);

      const payload = {
        name: form.name.trim(),

        phone: form.phone.trim(),

        email: form.email.trim(),

        goldType: form.goldType,

        weight: Number(form.weight),

        location:
          form.location.trim(),

        message:
          form.message.trim(),
      };

      const response =
        await enquiryApi.create(payload);

      console.log(
        "Enquiry submitted successfully:",
        response.data
      );

      setSuccess(
        "Your enquiry has been submitted successfully. Our team will contact you shortly."
      );

      setForm(initialForm);

    } catch (err) {

      console.error(
        "Enquiry submission failed:",
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

      setError(
        "Unable to submit your enquiry right now. Please try again."
      );

    } finally {

      setLoading(false);
    }
  };


  return (
    <form
      className="enquiry-form"
      onSubmit={handleSubmit}
      noValidate
    >

      {/* NAME + PHONE */}

      <div className="enquiry-form-grid">

        <div className="enquiry-field">

          <label htmlFor="enquiry-name">
            Name
          </label>

          <input
            id="enquiry-name"
            name="name"
            type="text"
            placeholder="Enter your name"
            value={form.name}
            onChange={handleChange}
            autoComplete="name"
            disabled={loading}
          />

        </div>


        <div className="enquiry-field">

          <label htmlFor="enquiry-phone">
            Phone
          </label>

          <input
            id="enquiry-phone"
            name="phone"
            type="tel"
            inputMode="numeric"
            maxLength="10"
            placeholder="10-digit mobile number"
            value={form.phone}
            onChange={(e) => {

              const onlyNumbers =
                e.target.value.replace(
                  /\D/g,
                  ""
                );

              setForm((current) => ({
                ...current,
                phone: onlyNumbers,
              }));

              setError("");
              setSuccess("");
            }}
            autoComplete="tel"
            disabled={loading}
          />

        </div>

      </div>


      {/* EMAIL + GOLD TYPE */}

      <div className="enquiry-form-grid">

        <div className="enquiry-field">

          <label htmlFor="enquiry-email">
            Email
          </label>

          <input
            id="enquiry-email"
            name="email"
            type="email"
            placeholder="Enter your email"
            value={form.email}
            onChange={handleChange}
            autoComplete="email"
            disabled={loading}
          />

        </div>


        <div className="enquiry-field">

          <label htmlFor="enquiry-gold-type">
            Gold Type
          </label>

          <select
            id="enquiry-gold-type"
            name="goldType"
            value={form.goldType}
            onChange={handleChange}
            disabled={loading}
          >

            <option value="24K Gold">
              24K Gold
            </option>

            <option value="22K Gold">
              22K Gold
            </option>

            <option value="18K Gold">
              18K Gold
            </option>

          </select>

        </div>

      </div>


      {/* WEIGHT + LOCATION */}

      <div className="enquiry-form-grid">

        <div className="enquiry-field">

          <label htmlFor="enquiry-weight">
            Weight (grams)
          </label>

          <input
            id="enquiry-weight"
            name="weight"
            type="number"
            min="0.01"
            step="0.01"
            placeholder="Enter approximate weight"
            value={form.weight}
            onChange={handleChange}
            disabled={loading}
          />

        </div>


        <div className="enquiry-field">

          <label htmlFor="enquiry-location">
            Location
          </label>

          <input
            id="enquiry-location"
            name="location"
            type="text"
            placeholder="Enter your location"
            value={form.location}
            onChange={handleChange}
            autoComplete="address-level2"
            disabled={loading}
          />

        </div>

      </div>


      {/* MESSAGE */}

      <div className="enquiry-field enquiry-field-full">

        <label htmlFor="enquiry-message">
          Message
        </label>

        <textarea
          id="enquiry-message"
          name="message"
          rows="6"
          placeholder="Tell us how we can help you..."
          value={form.message}
          onChange={handleChange}
          disabled={loading}
        />

      </div>


      {/* ERROR */}

      {error && (

        <div className="enquiry-form-error">
          {error}
        </div>

      )}


      {/* SUCCESS */}

      {success && (

        <div className="enquiry-form-success">
          {success}
        </div>

      )}


      {/* SUBMIT */}

      <button
        type="submit"
        className="enquiry-submit-button"
        disabled={loading}
      >

        {loading
          ? "Submitting..."
          : "Submit Enquiry"}

      </button>


      <p className="enquiry-form-note">
        Your details are securely shared with
        Suvarna Lakshmi Gold Buyers for enquiry
        follow-up.
      </p>

    </form>
  );
};

export default EnquiryForm;