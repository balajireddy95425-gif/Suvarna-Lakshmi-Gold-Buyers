import { useEffect, useMemo, useState } from "react";
import {
  enquiryApi,
  goldCalculationApi,
} from "../services/api";
import "./AdminLeads.css";

const STATUS_OPTIONS = [
  "New",
  "Contacted",
  "Interested",
  "Appointment Booked",
  "Completed",
  "Not Interested",
];

const AdminLeads = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const loadLeads = async () => {
    try {
      setLoading(true);
      setError("");

      const [enquiryResponse, calculationResponse] =
        await Promise.all([
          enquiryApi.getAll(),
          goldCalculationApi.getAll(),
        ]);

      const enquiries = Array.isArray(enquiryResponse.data)
        ? enquiryResponse.data
        : [];

      const calculations =
        Array.isArray(calculationResponse.data)
          ? calculationResponse.data
          : [];

      const enquiryLeads = enquiries.map((item) => ({
        id: item.id,
        name: item.name || "Unknown",
        phone: item.phone || "",
        type: "Enquiry",
        source: "Website Enquiry",
        status: item.status || "New",
        date: item.createdAt || item.date || null,
        message: item.message || "",
        raw: item,
      }));

      const calculationLeads = calculations.map((item) => ({
        id: item.id,
        name: item.name || "Unknown",
        phone: item.phone || "",
        type: "Gold Valuation",
        source: "Gold Calculator",
        status: item.status || "New",
        date: item.createdAt || item.date || null,
        message: "",
        weight: item.weight,
        purity: item.purity,
        estimatedValue: item.estimatedValue,
        raw: item,
      }));

      const combinedLeads = [
        ...enquiryLeads.map((item) => ({
          ...item,
          leadKey: `enquiry-${item.id}`,
          apiType: "enquiry",
        })),
        ...calculationLeads.map((item) => ({
          ...item,
          leadKey: `calculation-${item.id}`,
          apiType: "calculation",
        })),
      ];

      combinedLeads.sort((a, b) => {
        const dateA = a.date
          ? new Date(a.date).getTime()
          : 0;

        const dateB = b.date
          ? new Date(b.date).getTime()
          : 0;

        return dateB - dateA;
      });

      setLeads(combinedLeads);
    } catch (err) {
      console.error("Failed to load leads:", err);

      setError(
        "Unable to load leads. Please make sure the backend is running."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLeads();
  }, []);

  const handleStatusChange = async (lead, newStatus) => {
    try {
      if (lead.apiType === "enquiry") {
        await enquiryApi.updateStatus(
          lead.id,
          newStatus
        );
      } else {
        await goldCalculationApi.updateStatus(
          lead.id,
          newStatus
        );
      }

      setLeads((currentLeads) =>
        currentLeads.map((item) =>
          item.leadKey === lead.leadKey
            ? {
                ...item,
                status: newStatus,
              }
            : item
        )
      );
    } catch (err) {
      console.error(
        "Failed to update lead status:",
        err
      );

      alert("Unable to update lead status.");
    }
  };

  const formatDate = (dateValue) => {
    if (!dateValue) {
      return "—";
    }

    const date = new Date(dateValue);

    if (Number.isNaN(date.getTime())) {
      return "—";
    }

    return date.toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const filteredLeads = useMemo(() => {
    const searchText = search
      .trim()
      .toLowerCase();

    return leads.filter((lead) => {
      const matchesSearch =
        !searchText ||
        lead.name
          .toLowerCase()
          .includes(searchText) ||
        lead.phone
          .toLowerCase()
          .includes(searchText) ||
        lead.type
          .toLowerCase()
          .includes(searchText) ||
        lead.source
          .toLowerCase()
          .includes(searchText);

      const matchesStatus =
        statusFilter === "All" ||
        lead.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [leads, search, statusFilter]);

  const stats = useMemo(() => {
    return {
      total: leads.length,
      new: leads.filter(
        (lead) => lead.status === "New"
      ).length,
      contacted: leads.filter(
        (lead) => lead.status === "Contacted"
      ).length,
      interested: leads.filter(
        (lead) => lead.status === "Interested"
      ).length,
      completed: leads.filter(
        (lead) => lead.status === "Completed"
      ).length,
    };
  }, [leads]);

  const getStatusClass = (status) => {
    return (
      "lead-status lead-status-" +
      status
        .toLowerCase()
        .replace(/\s+/g, "-")
    );
  };

  return (
    <div className="admin-section-page">

      {/* HEADER */}
      <div className="admin-section-header">

        <div>
          <h1>Leads</h1>

          <p>
            Manage website enquiries and gold
            valuation leads.
          </p>
        </div>

        <button
          className="admin-refresh-button"
          onClick={loadLeads}
          disabled={loading}
        >
          {loading ? "Loading..." : "Refresh"}
        </button>

      </div>

      {/* STATS */}
      <div className="lead-stats-grid">

        <div className="lead-stat-card">
          <span>Total Leads</span>
          <strong>{stats.total}</strong>
        </div>

        <div className="lead-stat-card">
          <span>New</span>
          <strong>{stats.new}</strong>
        </div>

        <div className="lead-stat-card">
          <span>Contacted</span>
          <strong>{stats.contacted}</strong>
        </div>

        <div className="lead-stat-card">
          <span>Interested</span>
          <strong>{stats.interested}</strong>
        </div>

        <div className="lead-stat-card">
          <span>Completed</span>
          <strong>{stats.completed}</strong>
        </div>

      </div>

      {/* FILTERS */}
      <div className="lead-filter-bar">

        <div className="lead-search-box">
          <input
            type="text"
            placeholder="Search name, phone, source..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />
        </div>

        <div className="lead-status-filter">
          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value)
            }
          >
            <option value="All">
              All Statuses
            </option>

            {STATUS_OPTIONS.map((status) => (
              <option
                key={status}
                value={status}
              >
                {status}
              </option>
            ))}
          </select>
        </div>

      </div>

      {/* ERROR */}
      {error && (
        <div className="admin-error-box">
          {error}
        </div>
      )}

      {/* TABLE */}
      <div className="dashboard-table-wrapper">

        {loading ? (
          <div className="admin-loading">
            Loading leads...
          </div>
        ) : filteredLeads.length === 0 ? (
          <div className="admin-empty">
            <h3>No leads found</h3>
            <p>
              There are no leads matching your
              current search or filter.
            </p>
          </div>
        ) : (
          <table className="dashboard-table">

            <thead>
              <tr>
                <th>#</th>
                <th>Customer</th>
                <th>Phone</th>
                <th>Lead Type</th>
                <th>Source</th>
                <th>Details</th>
                <th>Status</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>

              {filteredLeads.map(
                (lead, index) => (
                  <tr key={lead.leadKey}>

                    <td>
                      {index + 1}
                    </td>

                    <td>
                      <div className="customer-name">
                        {lead.name}
                      </div>
                    </td>

                    <td>
                      {lead.phone || "—"}
                    </td>

                    <td>
                      <span className="lead-type-badge">
                        {lead.type}
                      </span>
                    </td>

                    <td>
                      {lead.source}
                    </td>

                    <td>
                      {lead.type ===
                      "Gold Valuation" ? (
                        <div>
                          <div>
                            Weight:{" "}
                            {lead.weight ?? "—"} g
                          </div>

                          <div>
                            Purity:{" "}
                            {lead.purity ?? "—"}
                          </div>

                          <div>
                            Value: ₹
                            {lead.estimatedValue ??
                              "—"}
                          </div>
                        </div>
                      ) : (
                        <span>
                          {lead.message || "—"}
                        </span>
                      )}
                    </td>

                    <td>

                      <select
                        className={getStatusClass(
                          lead.status
                        )}
                        value={
                          lead.status || "New"
                        }
                        onChange={(e) =>
                          handleStatusChange(
                            lead,
                            e.target.value
                          )
                        }
                      >

                        {STATUS_OPTIONS.map(
                          (status) => (
                            <option
                              key={status}
                              value={status}
                            >
                              {status}
                            </option>
                          )
                        )}

                      </select>

                    </td>

                    <td>
                      {formatDate(
                        lead.date
                      )}
                    </td>

                    <td>

                      <div className="lead-action-buttons">

                        {lead.phone && (
                          <>
                            <a
                              href={`tel:${lead.phone}`}
                              className="lead-call-button"
                              title="Call customer"
                            >
                              Call
                            </a>

                            <a
                              href={`https://wa.me/91${lead.phone.replace(
                                /\D/g,
                                ""
                              )}`}
                              target="_blank"
                              rel="noreferrer"
                              className="lead-whatsapp-button"
                              title="WhatsApp customer"
                            >
                              WhatsApp
                            </a>
                          </>
                        )}

                      </div>

                    </td>

                  </tr>
                )
              )}

            </tbody>

          </table>
        )}

      </div>

    </div>
  );
};

export default AdminLeads;