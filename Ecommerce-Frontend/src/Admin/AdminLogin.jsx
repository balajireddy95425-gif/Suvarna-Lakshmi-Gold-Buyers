import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { adminApi } from "../services/api";
import "./AdminLogin.css";

const AdminLogin = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    const cleanUsername = username.trim();
    if (!cleanUsername || !password) {
      setError("Please enter your username and password.");
      return;
    }
    setLoading(true);
    try {
      const response = await adminApi.login({ username: cleanUsername, password });
      if (!response.data?.success || !response.data?.token) {
        throw new Error("Invalid login response");
      }
      sessionStorage.setItem("adminToken", response.data.token);
      sessionStorage.setItem("adminLoggedIn", "true");
      sessionStorage.setItem("adminUsername", response.data.username || cleanUsername);
      sessionStorage.setItem("adminRole", response.data.role || "ADMIN");
      navigate("/admin", { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || "Invalid username or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">

      <div className="login-glow login-glow-one"></div>
      <div className="login-glow login-glow-two"></div>

      <div className="login-wrapper">

        <div className="login-brand">

          <div className="login-brand-logo">
            SL
          </div>

          <div className="login-brand-name">
            <h1>SUVARNA LAKSHMI</h1>
            <span>GOLD BUYERS</span>
          </div>

        </div>

        <div className="login-card">

          <div className="login-card-top">

            <span className="login-badge">
              ADMIN PORTAL
            </span>

            <div className="login-shield">

              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M12 3L19 6V11C19 15.5 16.1 19.3 12 21C7.9 19.3 5 15.5 5 11V6L12 3Z"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinejoin="round"
                />

                <path
                  d="M9 12L11 14L15 10"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

            </div>

            <h2>Welcome back</h2>

            <p>
              Sign in to continue to your administration
              dashboard.
            </p>

          </div>

          <form onSubmit={handleLogin}>

            {/* USERNAME */}
            <div className="field">

              <label htmlFor="username">
                Username
              </label>

              <div className="field-box">

                <span className="field-icon">

                  <svg
                    width="19"
                    height="19"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      cx="12"
                      cy="8"
                      r="3.5"
                      stroke="currentColor"
                      strokeWidth="1.7"
                    />

                    <path
                      d="M5.5 20C6.2 16.8 8.4 15 12 15C15.6 15 17.8 16.8 18.5 20"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                    />
                  </svg>

                </span>

                <input
                  id="username"
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) =>
                    setUsername(e.target.value)
                  }
                  autoComplete="username"
                  disabled={loading}
                />

              </div>

            </div>

            {/* PASSWORD */}
            <div className="field">

              <label htmlFor="password">
                Password
              </label>

              <div className="field-box">

                <span className="field-icon">

                  <svg
                    width="19"
                    height="19"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <rect
                      x="5"
                      y="10"
                      width="14"
                      height="10"
                      rx="2"
                      stroke="currentColor"
                      strokeWidth="1.7"
                    />

                    <path
                      d="M8 10V7.5C8 5.29 9.79 3.5 12 3.5C14.21 3.5 16 5.29 16 7.5V10"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                    />

                    <circle
                      cx="12"
                      cy="15"
                      r="1"
                      fill="currentColor"
                    />
                  </svg>

                </span>

                <input
                  id="password"
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  autoComplete="current-password"
                  disabled={loading}
                />

                <button
                  type="button"
                  className="show-button"
                  onClick={() =>
                    setShowPassword(
                      (value) => !value
                    )
                  }
                  disabled={loading}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>

              </div>

            </div>

            {/* ERROR */}
            {error && (
              <div className="login-error">
                <span>!</span>
                <div>{error}</div>
              </div>
            )}

            {/* LOGIN BUTTON */}
            <button
              type="submit"
              className="signin-button"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner"></span>
                  SIGNING IN
                </>
              ) : (
                <>
                  SIGN IN
                  <span className="signin-arrow">
                    →
                  </span>
                </>
              )}
            </button>

          </form>

          <div className="security-line">

            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M12 3L19 6V11C19 15.5 16.1 19.3 12 21C7.9 19.3 5 15.5 5 11V6L12 3Z"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinejoin="round"
              />

              <path
                d="M9 12L11 14L15 10"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            Secure administrator access

          </div>

        </div>

        <div className="login-bottom">
          Authorized personnel only
        </div>

      </div>

    </div>
  );
};

export default AdminLogin;