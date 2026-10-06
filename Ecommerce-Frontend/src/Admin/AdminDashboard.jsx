import { useEffect, useMemo, useState } from "react";
import {
  Link,
  useLocation,
} from "react-router-dom";

import {
  goldRateApi,
  enquiryApi,
  appointmentApi,
  goldCalculationApi,
} from "../services/api";

import "./AdminDashboard.css";


// =========================================
// ICON COMPONENT
// =========================================

const Icon = ({ type, size = 20 }) => {
  const commonProps = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    stroke: "currentColor",
    strokeWidth: "1.8",
    strokeLinecap: "round",
    strokeLinejoin: "round",
  };

  switch (type) {

    // DASHBOARD
    case "dashboard":
      return (
        <svg {...commonProps}>
          <rect
            x="3"
            y="3"
            width="7"
            height="7"
            rx="1"
          />
          <rect
            x="14"
            y="3"
            width="7"
            height="7"
            rx="1"
          />
          <rect
            x="3"
            y="14"
            width="7"
            height="7"
            rx="1"
          />
          <rect
            x="14"
            y="14"
            width="7"
            height="7"
            rx="1"
          />
        </svg>
      );

    // USERS / LEADS
    case "users":
      return (
        <svg {...commonProps}>
          <circle
            cx="9"
            cy="8"
            r="3"
          />
          <path d="M3.5 20c.7-3.4 2.5-5 5.5-5s4.8 1.6 5.5 5" />
          <path d="M16 5.5c1.8.2 3 1.3 3 3 0 1.5-.9 2.5-2.3 2.9" />
          <path d="M17 15.2c2.2.6 3.5 2 4 4.8" />
        </svg>
      );

    // GOLD
    case "gold":
      return (
        <svg {...commonProps}>
          <path d="M8 3h8l3 5-7 13L5 8l3-5Z" />
          <path d="M5 8h14" />
          <path d="M8 3l4 5 4-5" />
        </svg>
      );

    // APPOINTMENT
    case "appointment":
      return (
        <svg {...commonProps}>
          <rect
            x="3"
            y="4"
            width="18"
            height="17"
            rx="2"
          />
          <path d="M16 2v4M8 2v4M3 9h18" />
          <path d="M8 13h3M13 13h3M8 17h3" />
        </svg>
      );

    // MESSAGE / ENQUIRY
    case "message":
      return (
        <svg {...commonProps}>
          <path d="M4 5h16v11H8l-4 4V5Z" />
          <path d="M8 9h8M8 12h5" />
        </svg>
      );

    // BLOG
    case "blog":
      return (
        <svg {...commonProps}>
          <path d="M5 4h14v16H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z" />
          <path d="M3 7h16" />
          <path d="M8 11h6M8 14h6M8 17h4" />
        </svg>
      );

    // BRANCH
    case "branch":
      return (
        <svg {...commonProps}>
          <path d="M12 21V8" />
          <path d="M12 8l-4-4M12 8l4-4" />
          <circle
            cx="6"
            cy="3.5"
            r="2"
          />
          <circle
            cx="18"
            cy="3.5"
            r="2"
          />
          <circle
            cx="12"
            cy="21"
            r="2"
          />
        </svg>
      );

    // SETTINGS
    case "settings":
      return (
        <svg {...commonProps}>
          <circle
            cx="12"
            cy="12"
            r="3"
          />
          <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-1.8 1.8-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.5V20h-2.6v-.1a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.9.3l-.1.1-1.8-1.8.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.5-1H6v-2.6h.1a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.9l-.1-.1L9 6.7l.1.1a1.7 1.7 0 0 0 1.9.3 1.7 1.7 0 0 0 1-1.5V5h2.6v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.9-.3l.1-.1 1.8 1.8-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.5 1h.1v2.6h-.1a1.7 1.7 0 0 0-1.5 1Z" />
        </svg>
      );

    // LOGOUT
    case "logout":
      return (
        <svg {...commonProps}>
          <path d="M10 4H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h5" />
          <path d="M14 8l4 4-4 4" />
          <path d="M9 12h9" />
        </svg>
      );

    // EYE
    case "eye":
      return (
        <svg {...commonProps}>
          <path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z" />
          <circle
            cx="12"
            cy="12"
            r="2.5"
          />
        </svg>
      );

    // PHONE
    case "phone":
      return (
        <svg {...commonProps}>
          <path d="M6.5 3.5 9 3l2 4-2 1.5a14 14 0 0 0 6 6L16.5 12l4 2 .5 2.5c.3 1.6-1.1 3-2.7 2.7C11.3 18.1 5.9 12.7 4.8 5.7 4.5 4.1 5 3.7 6.5 3.5Z" />
        </svg>
      );

    // ARROW
    case "arrow":
      return (
        <svg {...commonProps}>
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      );

    // RUPEE
    case "rupee":
      return (
        <svg {...commonProps}>
          <path d="M7 5h9M7 9h7.5M8 5c3.5 0 6 1.8 6 4s-2.5 4-6 4l7 6" />
        </svg>
      );

    // CLOCK
    case "clock":
      return (
        <svg {...commonProps}>
          <circle
            cx="12"
            cy="12"
            r="8.5"
          />
          <path d="M12 7v5l3.5 2" />
        </svg>
      );

    // CHECK
    case "check":
      return (
        <svg {...commonProps}>
          <path d="m5 12 4 4L19 6" />
        </svg>
      );

    default:
      return null;
  }
};


// =========================================
// FORMAT HELPERS
// =========================================

const formatDate = (value) => {
  if (!value) return "—";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "—";
  }

  return date.toLocaleDateString(
    "en-IN",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
  );
};


const formatDateTime = (value) => {
  if (!value) return "—";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "—";
  }

  return date.toLocaleString(
    "en-IN",
    {
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    }
  );
};


const formatCurrency = (value) => {
  const number = Number(value || 0);

  return `₹${number.toLocaleString(
    "en-IN",
    {
      maximumFractionDigits: 2,
    }
  )}`;
};


const getInitials = (name) => {
  if (!name) return "NA";

  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map(
      (part) =>
        part.charAt(0).toUpperCase()
    )
    .join("");
};


const getStatusClass = (status) => {
  const normalized = String(
    status || "New"
  )
    .toLowerCase()
    .replace(/\s+/g, "-");

  return `status-${normalized}`;
};


// =========================================
// SIDEBAR LINK
// =========================================

const SidebarLink = ({
  to,
  icon,
  label,
  active,
}) => {
  return (
    <Link
      to={to}
      className={`admin-sidebar-link ${
        active ? "active" : ""
      }`}
    >
      <span className="admin-sidebar-icon">
        <Icon
          type={icon}
          size={18}
        />
      </span>

      <span>{label}</span>
    </Link>
  );
};


// =========================================
// ADMIN DASHBOARD
// =========================================

const AdminDashboard = () => {

  const location = useLocation();

  const [loading, setLoading] =
    useState(true);

  const [refreshing, setRefreshing] =
    useState(false);

  const [error, setError] =
    useState("");

  const [goldRates, setGoldRates] =
    useState([]);

  const [enquiries, setEnquiries] =
    useState([]);

  const [appointments, setAppointments] =
    useState([]);

  const [valuations, setValuations] =
    useState([]);


  // =======================================
  // LOAD DASHBOARD DATA
  // =======================================

  const loadDashboard = async (
    showFullLoader = true
  ) => {

    try {

      if (showFullLoader) {
        setLoading(true);
      } else {
        setRefreshing(true);
      }

      setError("");

      const [
        goldRatesResponse,
        enquiriesResponse,
        appointmentsResponse,
        valuationsResponse,
      ] = await Promise.all([

        goldRateApi.getAll(),

        enquiryApi.getAll(),

        appointmentApi.getAll(),

        goldCalculationApi.getAll(),

      ]);


      setGoldRates(
        Array.isArray(
          goldRatesResponse?.data
        )
          ? goldRatesResponse.data
          : []
      );


      setEnquiries(
        Array.isArray(
          enquiriesResponse?.data
        )
          ? enquiriesResponse.data
          : []
      );


      setAppointments(
        Array.isArray(
          appointmentsResponse?.data
        )
          ? appointmentsResponse.data
          : []
      );


      setValuations(
        Array.isArray(
          valuationsResponse?.data
        )
          ? valuationsResponse.data
          : []
      );

    } catch (err) {

      console.error(
        "Dashboard loading error:",
        err
      );

      setError(
        "Unable to load dashboard data. Please check that the backend is running."
      );

    } finally {

      setLoading(false);

      setRefreshing(false);

    }
  };


  useEffect(() => {
    loadDashboard();
  }, []);


  // =======================================
  // LOGOUT
  // =======================================

  const handleLogout = () => {

    sessionStorage.removeItem(
      "adminLoggedIn"
    );

    sessionStorage.removeItem(
      "adminUsername"
    );

    window.location.replace(
      "/admin/login"
    );
  };


  // =======================================
  // ADMIN USER
  // =======================================

  const adminUsername =
    sessionStorage.getItem(
      "adminUsername"
    ) || "Admin";


  // =======================================
  // LATEST GOLD RATE
  // =======================================

  const latestGoldRate =
    useMemo(() => {

      if (!goldRates.length) {
        return null;
      }

      return [...goldRates].sort(
        (a, b) => {

          const aDate = new Date(
            a.updatedAt ||
              a.createdAt ||
              0
          ).getTime();

          const bDate = new Date(
            b.updatedAt ||
              b.createdAt ||
              0
          ).getTime();

          return bDate - aDate;
        }
      )[0];

    }, [goldRates]);


  // =======================================
  // COMBINED LEADS
  // =======================================

  const combinedLeads =
    useMemo(() => {

      const enquiryLeads =
        enquiries.map((item) => ({
          ...item,
          id: item.id,
          name:
            item.name ||
            "Unknown",
          phone:
            item.phone ||
            "",
          leadType:
            "Website Enquiry",
          status:
            item.status ||
            "New",
          createdAt:
            item.createdAt,
        }));


      const valuationLeads =
        valuations.map((item) => ({
          ...item,
          id: item.id,
          name:
            item.name ||
            "Unknown",
          phone:
            item.phone ||
            "",
          leadType:
            "Gold Valuation",
          status:
            item.status ||
            "New",
          createdAt:
            item.createdAt,
        }));


      return [
        ...enquiryLeads,
        ...valuationLeads,
      ].sort((a, b) => {

        const aTime = new Date(
          a.createdAt || 0
        ).getTime();

        const bTime = new Date(
          b.createdAt || 0
        ).getTime();

        return bTime - aTime;
      });

    }, [
      enquiries,
      valuations,
    ]);


  // =======================================
  // RECENT LEADS
  // =======================================

  const recentLeads =
    useMemo(() => {

      return combinedLeads.slice(
        0,
        5
      );

    }, [combinedLeads]);


  // =======================================
  // RECENT APPOINTMENTS
  // =======================================

  const recentAppointments =
    useMemo(() => {

      return [...appointments]
        .sort((a, b) => {

          const aTime = new Date(
            a.createdAt ||
              a.appointmentDate ||
              0
          ).getTime();

          const bTime = new Date(
            b.createdAt ||
              b.appointmentDate ||
              0
          ).getTime();

          return bTime - aTime;
        })
        .slice(0, 5);

    }, [appointments]);


  // =======================================
  // TODAY COUNTS
  // =======================================

  const todayCount =
    useMemo(() => {

      const today =
        new Date();


      const isToday = (value) => {

        if (!value) {
          return false;
        }

        const date =
          new Date(value);


        return (
          date.getFullYear() ===
            today.getFullYear() &&
          date.getMonth() ===
            today.getMonth() &&
          date.getDate() ===
            today.getDate()
        );
      };


      const todayLeads =
        combinedLeads.filter(
          (item) =>
            isToday(
              item.createdAt
            )
        ).length;


      const todayAppointments =
        appointments.filter(
          (item) =>
            isToday(
              item.createdAt
            ) ||
            isToday(
              item.appointmentDate
            )
        ).length;


      return {
        leads: todayLeads,
        appointments:
          todayAppointments,
      };

    }, [
      combinedLeads,
      appointments,
    ]);


  // =======================================
  // DASHBOARD STATS
  // =======================================

  const stats = [

    {
      title: "Total Leads",
      value:
        combinedLeads.length,
      description:
        `${todayCount.leads} received today`,
      icon: "users",
      className:
        "stat-gold",
    },

    {
      title: "Gold Valuations",
      value:
        valuations.length,
      description:
        "Customer valuation requests",
      icon: "gold",
      className:
        "stat-dark",
    },

    {
      title: "Appointments",
      value:
        appointments.length,
      description:
        `${todayCount.appointments} active today`,
      icon:
        "appointment",
      className:
        "stat-light",
    },

    {
      title: "Enquiries",
      value:
        enquiries.length,
      description:
        "Website enquiries",
      icon: "message",
      className:
        "stat-soft",
    },

  ];


  // =======================================
  // RECENT ACTIVITY
  // =======================================

  const activities =
    useMemo(() => {

      const items = [];


      recentLeads
        .slice(0, 3)
        .forEach((lead) => {

          items.push({
            title:
              lead.leadType ===
              "Gold Valuation"
                ? "New gold valuation"
                : "New website enquiry",

            customer:
              lead.name,

            time:
              lead.createdAt,

            icon:
              lead.leadType ===
              "Gold Valuation"
                ? "gold"
                : "message",
          });

        });


      recentAppointments
        .slice(0, 2)
        .forEach(
          (appointment) => {

            items.push({
              title:
                "New appointment request",

              customer:
                appointment.name,

              time:
                appointment.createdAt ||
                appointment.appointmentDate,

              icon:
                "appointment",
            });

          }
        );


      return items
        .sort((a, b) => {

          const aTime =
            new Date(
              a.time || 0
            ).getTime();

          const bTime =
            new Date(
              b.time || 0
            ).getTime();

          return bTime - aTime;
        })
        .slice(0, 5);

    }, [
      recentLeads,
      recentAppointments,
    ]);


  // =======================================
  // ACTIVE SIDEBAR ITEM
  // =======================================

  const isActive = (path) => {

    if (path === "/admin") {

      return (
        location.pathname ===
        "/admin"
      );
    }

    return location.pathname.startsWith(
      path
    );
  };


  // =======================================
  // LOADING SCREEN
  // =======================================

  if (loading) {

    return (
      <div className="admin-dashboard-loading">

        <div className="dashboard-loader"></div>

        <h3>
          Loading Dashboard
        </h3>

        <p>
          Preparing your business
          overview...
        </p>

      </div>
    );
  }


  // =======================================
  // DASHBOARD UI
  // =======================================

  return (

    <div className="admin-dashboard">

      {/* =================================
          SIDEBAR
      ================================== */}

      <aside className="admin-sidebar">


        {/* BRAND */}
        <div className="admin-sidebar-brand">

          <div className="admin-sidebar-logo">
            SL
          </div>

          <div className="admin-sidebar-brand-text">

            <strong>
              SUVARNA LAKSHMI
            </strong>

            <span>
              GOLD BUYERS
            </span>

          </div>

        </div>


        {/* MAIN MENU */}
        <div className="admin-sidebar-section">

          <div className="admin-sidebar-label">
            MAIN MENU
          </div>


          <nav>

            <SidebarLink
              to="/admin"
              icon="dashboard"
              label="Overview"
              active={
                isActive("/admin")
              }
            />


            <SidebarLink
              to="/admin/leads"
              icon="users"
              label="Leads"
              active={
                isActive(
                  "/admin/leads"
                )
              }
            />


            <SidebarLink
              to="/admin/valuations"
              icon="gold"
              label="Gold Valuations"
              active={
                isActive(
                  "/admin/valuations"
                )
              }
            />


            <SidebarLink
              to="/admin/enquiries"
              icon="message"
              label="Enquiries"
              active={
                isActive(
                  "/admin/enquiries"
                )
              }
            />


            <SidebarLink
              to="/admin/appointments"
              icon="appointment"
              label="Appointments"
              active={
                isActive(
                  "/admin/appointments"
                )
              }
            />

          </nav>

        </div>


        {/* MANAGEMENT */}
        <div className="admin-sidebar-section">

          <div className="admin-sidebar-label">
            MANAGEMENT
          </div>


          <nav>

            <SidebarLink
              to="/admin/gold-rates"
              icon="gold"
              label="Gold Rates"
              active={
                isActive(
                  "/admin/gold-rates"
                )
              }
            />


            <SidebarLink
              to="/admin/branches"
              icon="branch"
              label="Branches"
              active={
                isActive(
                  "/admin/branches"
                )
              }
            />


            {/* BLOG */}
            <SidebarLink
              to="/admin/blog"
              icon="blog"
              label="Blog"
              active={
                isActive(
                  "/admin/blog"
                )
              }
            />

          </nav>

        </div>


        {/* SIDEBAR BOTTOM */}
        <div className="admin-sidebar-bottom">


          <Link
            to="/"
            className="admin-sidebar-website"
          >

            <span className="admin-sidebar-icon">

              <Icon
                type="eye"
                size={18}
              />

            </span>

            <span>
              View Website
            </span>

          </Link>


          <button
            className="admin-sidebar-logout"
            onClick={handleLogout}
          >

            <span className="admin-sidebar-icon">

              <Icon
                type="logout"
                size={18}
              />

            </span>

            <span>
              Logout
            </span>

          </button>

        </div>

      </aside>


      {/* =================================
          MAIN AREA
      ================================== */}

      <main className="admin-main">


        {/* TOP BAR */}
        <header className="admin-topbar">


          <div className="admin-topbar-left">

            <div className="admin-breadcrumb">

              Administration

              <span>
                /
              </span>

              Overview

            </div>


            <h1>
              Dashboard
            </h1>

          </div>


          <div className="admin-topbar-right">


            <button
              className="admin-refresh-button"
              onClick={() =>
                loadDashboard(false)
              }
              disabled={refreshing}
              title="Refresh dashboard"
            >

              <span
                className={
                  refreshing
                    ? "refresh-spin"
                    : ""
                }
              >
                ↻
              </span>


              {refreshing
                ? "Refreshing..."
                : "Refresh"}

            </button>


            <div className="admin-user">

              <div className="admin-user-avatar">

                {getInitials(
                  adminUsername
                )}

              </div>


              <div className="admin-user-info">

                <strong>
                  {adminUsername}
                </strong>

                <span>
                  Administrator
                </span>

              </div>

            </div>

          </div>

        </header>


        {/* =================================
            CONTENT
        ================================== */}

        <div className="admin-content">


          {/* ERROR */}
          {error && (

            <div className="admin-dashboard-error">

              <strong>
                Connection issue:
              </strong>{" "}

              {error}

            </div>

          )}


          {/* WELCOME */}
          <section className="admin-welcome">


            <div>

              <span className="admin-eyebrow">
                BUSINESS OVERVIEW
              </span>


              <h2>
                Welcome back,{" "}
                {adminUsername}
              </h2>


              <p>
                Here is what's happening
                with your gold-buying
                business today.
              </p>

            </div>


            <div className="admin-welcome-date">

              <span>

                <Icon
                  type="clock"
                  size={16}
                />

              </span>


              <div>

                <strong>

                  {new Date().toLocaleDateString(
                    "en-IN",
                    {
                      weekday:
                        "long",
                      day:
                        "2-digit",
                      month:
                        "long",
                      year:
                        "numeric",
                    }
                  )}

                </strong>


                <small>
                  Admin control center
                </small>

              </div>

            </div>

          </section>


          {/* =================================
              STAT CARDS
          ================================== */}

          <section className="admin-stats-grid">

            {stats.map(
              (stat) => (

                <div
                  className={`admin-stat-card ${stat.className}`}
                  key={
                    stat.title
                  }
                >

                  <div className="admin-stat-top">

                    <div className="admin-stat-icon">

                      <Icon
                        type={
                          stat.icon
                        }
                        size={21}
                      />

                    </div>

                  </div>


                  <div className="admin-stat-title">

                    {stat.title}

                  </div>


                  <div className="admin-stat-value">

                    {stat.value}

                  </div>


                  <div className="admin-stat-description">

                    {stat.description}

                  </div>

                </div>

              )
            )}

          </section>


          {/* =================================
              GOLD RATE + QUICK ACTIONS
          ================================== */}

          <section className="admin-main-grid">


            {/* GOLD RATE */}
            <div className="admin-panel gold-rate-panel">


              <div className="admin-panel-header">

                <div>

                  <span className="admin-panel-kicker">
                    MARKET INFORMATION
                  </span>


                  <h3>
                    Today's Gold Rates
                  </h3>

                </div>


                <Link
                  to="/admin/gold-rates"
                  className="admin-panel-link"
                >

                  Manage

                  <Icon
                    type="arrow"
                    size={14}
                  />

                </Link>

              </div>


              {latestGoldRate ? (

                <>

                  <div className="gold-rate-date">

                    Updated{" "}

                    {formatDateTime(
                      latestGoldRate.updatedAt ||
                      latestGoldRate.createdAt
                    )}

                  </div>


                  <div className="gold-rate-cards">


                    <div className="gold-rate-item">

                      <span>
                        24K GOLD
                      </span>

                      <strong>
                        {formatCurrency(
                          latestGoldRate.gold24k
                        )}
                      </strong>

                      <small>
                        Per gram
                      </small>

                    </div>


                    <div className="gold-rate-item">

                      <span>
                        22K GOLD
                      </span>

                      <strong>
                        {formatCurrency(
                          latestGoldRate.gold22k
                        )}
                      </strong>

                      <small>
                        Per gram
                      </small>

                    </div>


                    <div className="gold-rate-item">

                      <span>
                        18K GOLD
                      </span>

                      <strong>
                        {formatCurrency(
                          latestGoldRate.gold18k
                        )}
                      </strong>

                      <small>
                        Per gram
                      </small>

                    </div>


                  </div>

                </>

              ) : (

                <div className="admin-empty-state">

                  <div className="empty-icon">

                    <Icon
                      type="gold"
                      size={22}
                    />

                  </div>


                  <h4>
                    No gold rate available
                  </h4>


                  <p>
                    Add today's gold
                    rates from the
                    Gold Rates section.
                  </p>


                  <Link
                    to="/admin/gold-rates"
                    className="admin-small-button"
                  >
                    Add Gold Rate
                  </Link>

                </div>

              )}

            </div>


            {/* QUICK ACTIONS */}
            <div className="admin-panel">


              <div className="admin-panel-header">

                <div>

                  <span className="admin-panel-kicker">
                    SHORTCUTS
                  </span>

                  <h3>
                    Quick Actions
                  </h3>

                </div>

              </div>


              <div className="quick-actions-grid">


                {/* LEADS */}
                <Link
                  to="/admin/leads"
                  className="quick-action"
                >

                  <span className="quick-action-icon">

                    <Icon
                      type="users"
                      size={19}
                    />

                  </span>


                  <span>

                    <strong>
                      View Leads
                    </strong>

                    <small>
                      Follow up with
                      customers
                    </small>

                  </span>


                  <span className="quick-arrow">
                    →
                  </span>

                </Link>


                {/* VALUATIONS */}
                <Link
                  to="/admin/valuations"
                  className="quick-action"
                >

                  <span className="quick-action-icon">

                    <Icon
                      type="gold"
                      size={19}
                    />

                  </span>


                  <span>

                    <strong>
                      Valuations
                    </strong>

                    <small>
                      Review gold
                      estimates
                    </small>

                  </span>


                  <span className="quick-arrow">
                    →
                  </span>

                </Link>


                {/* APPOINTMENTS */}
                <Link
                  to="/admin/appointments"
                  className="quick-action"
                >

                  <span className="quick-action-icon">

                    <Icon
                      type="appointment"
                      size={19}
                    />

                  </span>


                  <span>

                    <strong>
                      Appointments
                    </strong>

                    <small>
                      Check scheduled
                      visits
                    </small>

                  </span>


                  <span className="quick-arrow">
                    →
                  </span>

                </Link>


                {/* GOLD RATES */}
                <Link
                  to="/admin/gold-rates"
                  className="quick-action"
                >

                  <span className="quick-action-icon">

                    <Icon
                      type="settings"
                      size={19}
                    />

                  </span>


                  <span>

                    <strong>
                      Update Rates
                    </strong>

                    <small>
                      Manage today's
                      rates
                    </small>

                  </span>


                  <span className="quick-arrow">
                    →
                  </span>

                </Link>


                {/* BLOG */}
                <Link
                  to="/admin/blog"
                  className="quick-action"
                >

                  <span className="quick-action-icon">

                    <Icon
                      type="blog"
                      size={19}
                    />

                  </span>


                  <span>

                    <strong>
                      Blog Management
                    </strong>

                    <small>
                      Create and manage
                      articles
                    </small>

                  </span>


                  <span className="quick-arrow">
                    →
                  </span>

                </Link>


              </div>

            </div>

          </section>


          {/* =================================
              RECENT LEADS + ACTIVITY
          ================================== */}

          <section className="admin-main-grid">


            {/* RECENT LEADS */}
            <div className="admin-panel">


              <div className="admin-panel-header">

                <div>

                  <span className="admin-panel-kicker">
                    CUSTOMER PIPELINE
                  </span>


                  <h3>
                    Recent Leads
                  </h3>

                </div>


                <Link
                  to="/admin/leads"
                  className="admin-panel-link"
                >

                  View All

                  <Icon
                    type="arrow"
                    size={14}
                  />

                </Link>

              </div>


              {recentLeads.length > 0 ? (

                <div className="admin-table-wrapper">

                  <table className="admin-dashboard-table">

                    <thead>

                      <tr>

                        <th>
                          Customer
                        </th>

                        <th>
                          Type
                        </th>

                        <th>
                          Status
                        </th>

                        <th>
                          Date
                        </th>

                      </tr>

                    </thead>


                    <tbody>

                      {recentLeads.map(
                        (lead) => (

                          <tr
                            key={`${lead.leadType}-${lead.id}`}
                          >

                            <td>

                              <div className="dashboard-customer">

                                <div className="dashboard-avatar">

                                  {getInitials(
                                    lead.name
                                  )}

                                </div>


                                <div>

                                  <strong>
                                    {lead.name}
                                  </strong>

                                  <small>
                                    {lead.phone ||
                                      "No phone"}
                                  </small>

                                </div>

                              </div>

                            </td>


                            <td>

                              <span className="dashboard-type">

                                {lead.leadType}

                              </span>

                            </td>


                            <td>

                              <span
                                className={`dashboard-status ${getStatusClass(
                                  lead.status
                                )}`}
                              >

                                {lead.status ||
                                  "New"}

                              </span>

                            </td>


                            <td>

                              <span className="dashboard-date">

                                {formatDate(
                                  lead.createdAt
                                )}

                              </span>

                            </td>

                          </tr>

                        )
                      )}

                    </tbody>

                  </table>

                </div>

              ) : (

                <div className="admin-empty-state compact">

                  <div className="empty-icon">

                    <Icon
                      type="users"
                      size={20}
                    />

                  </div>

                  <h4>
                    No leads yet
                  </h4>

                  <p>
                    Customer leads
                    will appear here.
                  </p>

                </div>

              )}

            </div>


            {/* RECENT ACTIVITY */}
            <div className="admin-panel activity-panel">


              <div className="admin-panel-header">

                <div>

                  <span className="admin-panel-kicker">
                    LIVE FEED
                  </span>

                  <h3>
                    Recent Activity
                  </h3>

                </div>

              </div>


              {activities.length > 0 ? (

                <div className="activity-list">

                  {activities.map(
                    (
                      activity,
                      index
                    ) => (

                      <div
                        className="activity-item"
                        key={`${activity.title}-${index}`}
                      >

                        <div className="activity-icon">

                          <Icon
                            type={
                              activity.icon
                            }
                            size={17}
                          />

                        </div>


                        <div className="activity-content">

                          <strong>
                            {activity.title}
                          </strong>

                          <span>
                            {activity.customer ||
                              "Customer"}
                          </span>

                          <small>
                            {formatDateTime(
                              activity.time
                            )}
                          </small>

                        </div>

                      </div>

                    )
                  )}

                </div>

              ) : (

                <div className="admin-empty-state compact">

                  <div className="empty-icon">

                    <Icon
                      type="clock"
                      size={20}
                    />

                  </div>


                  <h4>
                    No recent activity
                  </h4>


                  <p>
                    New activity will
                    appear here.
                  </p>

                </div>

              )}

            </div>

          </section>


          {/* =================================
              UPCOMING APPOINTMENTS
          ================================== */}

          <section className="admin-panel">


            <div className="admin-panel-header">

              <div>

                <span className="admin-panel-kicker">
                  CUSTOMER VISITS
                </span>

                <h3>
                  Upcoming Appointments
                </h3>

              </div>


              <Link
                to="/admin/appointments"
                className="admin-panel-link"
              >

                View All

                <Icon
                  type="arrow"
                  size={14}
                />

              </Link>

            </div>


            {recentAppointments.length >
            0 ? (

              <div className="admin-appointments-grid">

                {recentAppointments.map(
                  (appointment) => (

                    <div
                      className="appointment-card"
                      key={
                        appointment.id
                      }
                    >

                      <div className="appointment-card-top">

                        <div className="dashboard-avatar">

                          {getInitials(
                            appointment.name
                          )}

                        </div>


                        <span
                          className={`dashboard-status ${getStatusClass(
                            appointment.status ||
                              "New"
                          )}`}
                        >

                          {appointment.status ||
                            "New"}

                        </span>

                      </div>


                      <div className="appointment-name">

                        {appointment.name ||
                          "Unknown Customer"}

                      </div>


                      <div className="appointment-phone">

                        <Icon
                          type="phone"
                          size={14}
                        />

                        {appointment.phone ||
                          "No phone"}

                      </div>


                      <div className="appointment-details">


                        <div>

                          <span>
                            DATE
                          </span>

                          <strong>

                            {formatDate(
                              appointment.appointmentDate
                            )}

                          </strong>

                        </div>


                        <div>

                          <span>
                            TIME
                          </span>

                          <strong>

                            {appointment.appointmentTime ||
                              "—"}

                          </strong>

                        </div>


                      </div>

                    </div>

                  )
                )}

              </div>

            ) : (

              <div className="admin-empty-state compact">

                <div className="empty-icon">

                  <Icon
                    type="appointment"
                    size={20}
                  />

                </div>


                <h4>
                  No appointments found
                </h4>


                <p>
                  Scheduled customer
                  visits will appear
                  here.
                </p>

              </div>

            )}

          </section>


          {/* =================================
              FOOTER
          ================================== */}

          <footer className="admin-dashboard-footer">


            <div>

              <strong>
                Suvarna Lakshmi Gold Buyers
              </strong>

              <span>
                Administration Portal
              </span>

            </div>


            <div>

              <span>
                Total Leads:
              </span>

              <strong>
                {combinedLeads.length}
              </strong>


              <span className="footer-divider">
                |
              </span>


              <span>
                Appointments:
              </span>

              <strong>
                {appointments.length}
              </strong>

            </div>


          </footer>


        </div>

      </main>

    </div>
  );
};


export default AdminDashboard;