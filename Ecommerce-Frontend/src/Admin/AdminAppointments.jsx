import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { appointmentApi } from "../services/api";
import "./AdminSection.css";

const getName = (item) =>
  item?.name ||
  item?.customerName ||
  item?.fullName ||
  "Customer";

const getPhone = (item) =>
  item?.phone ||
  item?.mobile ||
  item?.mobileNumber ||
  "";

const getBranch = (item) =>
  item?.branch ||
  item?.branchName ||
  item?.location ||
  "-";

const getDate = (item) =>
  item?.appointmentDate ||
  item?.date ||
  item?.bookingDate ||
  item?.createdAt;

const getTime = (item) =>
  item?.appointmentTime ||
  item?.time ||
  item?.bookingTime ||
  "-";

const formatDate = (value) => {
  if (!value) return "-";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "-";

  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

function AdminAppointments() {
  const [appointments, setAppointments] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const loadAppointments = async () => {
    try {
      setLoading(true);

      const response =
        await appointmentApi.getAll();

      setAppointments(
        Array.isArray(response.data)
          ? response.data
          : []
      );
    } catch (error) {
      console.error(
        "Error loading appointments:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAppointments();
  }, []);

  return (
    <div className="admin-section-page">

      <div className="admin-section-header">

        <div>
          <span>APPOINTMENT MANAGEMENT</span>

          <h1>
            Appointments
          </h1>

          <p>
            Manage customer booking requests
            and appointment details.
          </p>
        </div>

        <div className="admin-section-header-actions">

          <button
            className="admin-refresh-button"
            onClick={loadAppointments}
          >
            ↻ Refresh
          </button>

          <Link
            to="/admin"
            className="admin-back-button"
          >
            ← Dashboard
          </Link>

        </div>

      </div>

      <div className="admin-section-stats">

        <div className="admin-stat-card">
          <span>Total Appointments</span>
          <strong>
            {appointments.length}
          </strong>
        </div>

        <div className="admin-stat-card">
          <span>Booked Customers</span>
          <strong>
            {appointments.length}
          </strong>
        </div>

        <div className="admin-stat-card">
          <span>Branches</span>
          <strong>
            {
              new Set(
                appointments.map(
                  (item) => getBranch(item)
                )
              ).size
            }
          </strong>
        </div>

      </div>

      <div className="admin-data-card">

        <div className="admin-data-card-header">
          <span>
            CUSTOMER BOOKINGS
          </span>

          <h2>
            Appointment List
          </h2>
        </div>

        {loading ? (
          <div className="admin-empty-state">
            Loading appointments...
          </div>
        ) : appointments.length === 0 ? (
          <div className="admin-empty-state">

            <div className="admin-empty-icon">
              ▣
            </div>

            <h3>
              No appointments available
            </h3>

            <p>
              New customer bookings will
              appear here.
            </p>

          </div>
        ) : (
          <div className="admin-table-wrapper">

            <table className="admin-table">

              <thead>
                <tr>
                  <th>Customer</th>
                  <th>Phone</th>
                  <th>Branch</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>

                {appointments.map(
                  (item, index) => {

                    const phone =
                      getPhone(item);

                    return (
                      <tr
                        key={
                          item.id || index
                        }
                      >

                        <td>
                          <strong>
                            {getName(item)}
                          </strong>
                        </td>

                        <td>
                          {phone ||
                            "Not provided"}
                        </td>

                        <td>
                          {getBranch(item)}
                        </td>

                        <td>
                          {formatDate(
                            getDate(item)
                          )}
                        </td>

                        <td>
                          <span className="admin-badge blue">
                            {getTime(item)}
                          </span>
                        </td>

                        <td>
                          {phone ? (
                            <a
                              href={`tel:${phone}`}
                              className="admin-call-button"
                            >
                              ☎ Call
                            </a>
                          ) : (
                            "-"
                          )}
                        </td>

                      </tr>
                    );
                  }
                )}

              </tbody>

            </table>

          </div>
        )}

      </div>

    </div>
  );
}

export default AdminAppointments;