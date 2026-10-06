import { useState } from "react";
import { Link } from "react-router-dom";

import { FaCalendarAlt, FaCheckCircle } from "react-icons/fa";
import { appointmentApi } from "../services/api";

function Appointment() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    branch: "",
    appointmentDate: "",
    appointmentTime: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setSuccess("");
    setError("");

    try {
      await appointmentApi.create(formData);

      setSuccess(
        "Your appointment has been booked successfully. We will contact you shortly."
      );

      setFormData({
        name: "",
        phone: "",
        email: "",
        branch: "",
        appointmentDate: "",
        appointmentTime: "",
        message: "",
      });
    } catch (err) {
      console.error("Appointment submission failed:", err);

      setError(
        "Unable to book the appointment. Please make sure the backend is running."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="appointment-page">

      {/* PAGE HEADER */}
      <section className="page-header">
        <div className="container">
          <span>BOOK A VISIT</span>

          <h1>Book an Appointment</h1>

          <p>
            Schedule a convenient time to visit Suvarna Lakshmi Gold Buyers
            for gold valuation and selling.
          </p>
        </div>
      </section>

      {/* APPOINTMENT FORM */}
      <section className="appointment-section">
        <div className="container">

          <div className="appointment-wrapper">

            {/* LEFT SIDE */}
            <div className="appointment-info">

              <div className="appointment-icon">
                <FaCalendarAlt />
              </div>

              <h2>Schedule Your Visit</h2>

              <p>
                Choose your preferred date and time. Our team will
                contact you to confirm your appointment.
              </p>

              <div className="appointment-points">
                <div>
                  <FaCheckCircle />
                  <span>Professional gold valuation</span>
                </div>

                <div>
                  <FaCheckCircle />
                  <span>Transparent evaluation process</span>
                </div>

                <div>
                  <FaCheckCircle />
                  <span>Convenient appointment timing</span>
                </div>

                <div>
                  <FaCheckCircle />
                  <span>Quick and reliable service</span>
                </div>
              </div>

              <Link to="/contact" className="appointment-contact-link">
                Contact Us
              </Link>
            </div>

            {/* RIGHT SIDE */}
            <div className="appointment-form-card">

              <h2>Appointment Details</h2>

              {success && (
                <div className="appointment-success">
                  {success}
                </div>
              )}

              {error && (
                <div className="appointment-error">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit}>

                {/* NAME */}
                <div className="form-group">
                  <label>Full Name *</label>

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                {/* PHONE + EMAIL */}
                <div className="appointment-row">

                  <div className="form-group">
                    <label>Phone Number *</label>

                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Enter phone number"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Email</label>

                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter email"
                    />
                  </div>

                </div>

                {/* BRANCH */}
                <div className="form-group">
                  <label>Preferred Branch *</label>

                  <select
                    name="branch"
                    value={formData.branch}
                    onChange={handleChange}
                    required
                  >
                    <option value="">
                      Select a branch
                    </option>

                    <option value="Bengaluru">
                      Bengaluru
                    </option>

                    <option value="Other">
                      Other
                    </option>
                  </select>
                </div>

                {/* DATE + TIME */}
                <div className="appointment-row">

                  <div className="form-group">
                    <label>Appointment Date *</label>

                    <input
                      type="date"
                      name="appointmentDate"
                      value={formData.appointmentDate}
                      onChange={handleChange}
                      min={new Date().toISOString().split("T")[0]}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Preferred Time *</label>

                    <select
                      name="appointmentTime"
                      value={formData.appointmentTime}
                      onChange={handleChange}
                      required
                    >
                      <option value="">
                        Select time
                      </option>

                      <option value="09:00 AM">
                        09:00 AM
                      </option>

                      <option value="10:00 AM">
                        10:00 AM
                      </option>

                      <option value="11:00 AM">
                        11:00 AM
                      </option>

                      <option value="12:00 PM">
                        12:00 PM
                      </option>

                      <option value="02:00 PM">
                        02:00 PM
                      </option>

                      <option value="03:00 PM">
                        03:00 PM
                      </option>

                      <option value="04:00 PM">
                        04:00 PM
                      </option>

                      <option value="05:00 PM">
                        05:00 PM
                      </option>

                      <option value="06:00 PM">
                        06:00 PM
                      </option>
                    </select>
                  </div>

                </div>

                {/* MESSAGE */}
                <div className="form-group">
                  <label>Message</label>

                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us anything we should know..."
                    rows="4"
                  />
                </div>

                {/* SUBMIT */}
                <button
                  type="submit"
                  className="appointment-submit"
                  disabled={loading}
                >
                  {loading
                    ? "Booking Appointment..."
                    : "Book Appointment"}
                </button>

              </form>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
}

export default Appointment;