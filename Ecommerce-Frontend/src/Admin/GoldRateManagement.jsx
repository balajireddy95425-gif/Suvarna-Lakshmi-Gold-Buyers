import { useEffect, useState } from "react";
import { goldRateApi } from "../services/api";

function GoldRateManagement() {
  const [rates, setRates] = useState([]);

  const [form, setForm] = useState({
    rate24k: "",
    rate22k: "",
    rate18k: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Load all existing gold rates
  const loadRates = async () => {
    try {
      setError("");

      const response = await goldRateApi.getAll();

      if (Array.isArray(response.data)) {
        setRates(response.data);
      } else {
        setRates([]);
      }
    } catch (err) {
      console.error("Error loading gold rates:", err);

      setError(
        "Unable to load gold rates. Make sure the backend is running."
      );
    }
  };

  // Load rates when page opens
  useEffect(() => {
    loadRates();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  // Save new gold rates
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");
    setError("");

    try {
      // IMPORTANT:
      // Backend expects gold24k, gold22k and gold18k
      const data = {
        gold24k: Number(form.rate24k),
        gold22k: Number(form.rate22k),
        gold18k: Number(form.rate18k),
      };

      await goldRateApi.create(data);

      setMessage("Gold rates added successfully.");

      // Clear form
      setForm({
        rate24k: "",
        rate22k: "",
        rate18k: ""
      });

      // Reload rate history
      await loadRates();
    } catch (err) {
      console.error("Error saving gold rates:", err);

      setError(
        "Unable to save gold rates. Please check the backend."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-management-page">
      <div className="container py-4">

        {/* Page Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h2>Gold Rate Management</h2>

            <p className="text-muted mb-0">
              Update the current gold rates.
            </p>
          </div>

          <a
            href="/admin"
            className="btn btn-outline-dark"
          >
            ← Dashboard
          </a>
        </div>

        {/* Add Rate Form */}
        <div className="card shadow-sm mb-4">
          <div className="card-body">

            <h4 className="mb-4">
              Add New Gold Rates
            </h4>

            <form onSubmit={handleSubmit}>
              <div className="row g-3">

                {/* 24K */}
                <div className="col-md-4">
                  <label className="form-label">
                    24K Gold Rate / Gram
                  </label>

                  <input
                    type="number"
                    name="rate24k"
                    className="form-control"
                    placeholder="Example: 8500"
                    min="0"
                    step="0.01"
                    value={form.rate24k}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* 22K */}
                <div className="col-md-4">
                  <label className="form-label">
                    22K Gold Rate / Gram
                  </label>

                  <input
                    type="number"
                    name="rate22k"
                    className="form-control"
                    placeholder="Example: 7800"
                    min="0"
                    step="0.01"
                    value={form.rate22k}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* 18K */}
                <div className="col-md-4">
                  <label className="form-label">
                    18K Gold Rate / Gram
                  </label>

                  <input
                    type="number"
                    name="rate18k"
                    className="form-control"
                    placeholder="Example: 6400"
                    min="0"
                    step="0.01"
                    value={form.rate18k}
                    onChange={handleChange}
                    required
                  />
                </div>

              </div>

              <button
                type="submit"
                className="btn btn-warning mt-4"
                disabled={loading}
              >
                {loading
                  ? "Saving..."
                  : "Save Gold Rates"}
              </button>
            </form>

            {/* Success Message */}
            {message && (
              <div className="alert alert-success mt-3 mb-0">
                {message}
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="alert alert-danger mt-3 mb-0">
                {error}
              </div>
            )}

          </div>
        </div>

        {/* Existing Rates */}
        <div className="card shadow-sm">
          <div className="card-body">

            <h4 className="mb-4">
              Gold Rate History
            </h4>

            {rates.length === 0 ? (
              <p className="text-muted">
                No gold rates available.
              </p>
            ) : (
              <div className="table-responsive">

                <table className="table table-bordered table-hover align-middle">

                  <thead className="table-dark">
                    <tr>
                      <th>ID</th>
                      <th>24K / Gram</th>
                      <th>22K / Gram</th>
                      <th>18K / Gram</th>
                    </tr>
                  </thead>

                  <tbody>
                    {rates.map((rate) => (
                      <tr key={rate.id}>

                        <td>
                          {rate.id}
                        </td>

                        <td>
                          ₹
                          {Number(rate.gold24k || 0).toLocaleString(
                            "en-IN"
                          )}
                        </td>

                        <td>
                          ₹
                          {Number(rate.gold22k || 0).toLocaleString(
                            "en-IN"
                          )}
                        </td>

                        <td>
                          ₹
                          {Number(rate.gold18k || 0).toLocaleString(
                            "en-IN"
                          )}
                        </td>

                      </tr>
                    ))}
                  </tbody>

                </table>

              </div>
            )}

          </div>
        </div>

      </div>
    </div>
  );
}

export default GoldRateManagement;