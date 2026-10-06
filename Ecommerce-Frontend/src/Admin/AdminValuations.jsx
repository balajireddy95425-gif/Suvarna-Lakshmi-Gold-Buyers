import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { goldCalculationApi } from "../services/api";
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

const formatDate = (value) => {
  if (!value) {
    return "-";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "-";
  }

  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const formatCurrency = (value) => {
  const number = Number(value);

  if (!Number.isFinite(number) || number <= 0) {
    return "-";
  }

  return `₹${number.toLocaleString("en-IN", {
    maximumFractionDigits: 2,
  })}`;
};

function AdminValuations() {
  const [valuations, setValuations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadValuations = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await goldCalculationApi.getAll();

      setValuations(
        Array.isArray(response.data)
          ? response.data
          : []
      );
    } catch (err) {
      console.error(
        "Error loading valuations:",
        err
      );

      setError(
        "Unable to load gold valuations. Please make sure the backend is running."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadValuations();
  }, []);

  return (
    <div className="admin-section-page">

      {/* =========================================
          HEADER
      ========================================== */}

      <div className="admin-section-header">

        <div>
          <span>
            GOLD VALUATION MANAGEMENT
          </span>

          <h1>
            Gold Valuations
          </h1>

          <p>
            View customer gold valuation requests.
          </p>
        </div>

        <div className="admin-section-header-actions">

          <button
            className="admin-refresh-button"
            onClick={loadValuations}
            disabled={loading}
          >
            {loading
              ? "Loading..."
              : "↻ Refresh"}
          </button>

          <Link
            to="/admin"
            className="admin-back-button"
          >
            ← Dashboard
          </Link>

        </div>

      </div>

      {/* =========================================
          SUMMARY
      ========================================== */}

      <div className="admin-section-stats">

        <div className="admin-stat-card">

          <span>
            Total Valuations
          </span>

          <strong>
            {valuations.length}
          </strong>

        </div>

        <div className="admin-stat-card">

          <span>
            24K Requests
          </span>

          <strong>
            {
              valuations.filter(
                (item) =>
                  String(
                    item.goldType || ""
                  )
                    .toLowerCase()
                    .includes("24")
              ).length
            }
          </strong>

        </div>

        <div className="admin-stat-card">

          <span>
            22K Requests
          </span>

          <strong>
            {
              valuations.filter(
                (item) =>
                  String(
                    item.goldType || ""
                  )
                    .toLowerCase()
                    .includes("22")
              ).length
            }
          </strong>

        </div>

      </div>

      {/* =========================================
          ERROR
      ========================================== */}

      {error && (
        <div className="admin-error-box">
          {error}
        </div>
      )}

      {/* =========================================
          DATA CARD
      ========================================== */}

      <div className="admin-data-card">

        <div className="admin-data-card-header">

          <span>
            ALL VALUATION REQUESTS
          </span>

          <h2>
            Customer Valuations
          </h2>

        </div>

        {/* LOADING */}
        {loading ? (

          <div className="admin-empty-state">
            Loading valuations...
          </div>

        ) : valuations.length === 0 ? (

          /* EMPTY */
          <div className="admin-empty-state">

            <div className="admin-empty-icon">
              ₹
            </div>

            <h3>
              No valuation requests
            </h3>

            <p>
              Customer calculator submissions
              will appear here.
            </p>

          </div>

        ) : (

          /* TABLE */
          <div className="admin-table-wrapper">

            <table className="admin-table">

              <thead>

                <tr>

                  <th>
                    Customer
                  </th>

                  <th>
                    Phone
                  </th>

                  <th>
                    Gold Type
                  </th>

                  <th>
                    Weight
                  </th>

                  <th>
                    Rate / Gram
                  </th>

                  <th>
                    Estimated Value
                  </th>

                  <th>
                    Campaign ID
                  </th>

                  <th>
                    Date
                  </th>

                  <th>
                    Action
                  </th>

                </tr>

              </thead>

              <tbody>

                {valuations.map(
                  (item, index) => {

                    const weight =
                      Number(
                        item.weight || 0
                      );

                    const rate =
                      Number(
                        item.goldRate || 0
                      );

                    const savedEstimate =
                      Number(
                        item.estimatedValue
                      );

                    const calculatedEstimate =
                      weight * rate;

                    const estimatedValue =
                      Number.isFinite(
                        savedEstimate
                      ) &&
                      savedEstimate > 0
                        ? savedEstimate
                        : calculatedEstimate;

                    const phone =
                      getPhone(item);

                    const campaignId =
                      item.campaignId ||
                      item.campaignID ||
                      "";

                    return (

                      <tr
                        key={
                          item.id ||
                          index
                        }
                      >

                        {/* CUSTOMER */}
                        <td>

                          <strong>
                            {getName(item)}
                          </strong>

                        </td>

                        {/* PHONE */}
                        <td>

                          {phone ||
                            "Not provided"}

                        </td>

                        {/* GOLD TYPE */}
                        <td>

                          <span className="admin-badge gold">

                            {item.goldType ||
                              "-"}

                          </span>

                        </td>

                        {/* WEIGHT */}
                        <td>

                          {weight
                            ? `${weight} g`
                            : "-"}

                        </td>

                        {/* RATE */}
                        <td>

                          {rate
                            ? formatCurrency(
                                rate
                              )
                            : "-"}

                        </td>

                        {/* ESTIMATED VALUE */}
                        <td>

                          <strong>

                            {estimatedValue
                              ? formatCurrency(
                                  estimatedValue
                                )
                              : "-"}

                          </strong>

                        </td>

                        {/* CAMPAIGN ID */}
                        <td>

                          {campaignId ? (
                            <span
                              className="admin-badge"
                              title={
                                campaignId
                              }
                            >
                              {campaignId}
                            </span>
                          ) : (
                            <span
                              style={{
                                opacity: 0.65,
                              }}
                            >
                              Direct
                            </span>
                          )}

                        </td>

                        {/* DATE */}
                        <td>

                          {formatDate(
                            item.createdAt ||
                              item.createdDate ||
                              item.date
                          )}

                        </td>

                        {/* ACTION */}
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

export default AdminValuations;