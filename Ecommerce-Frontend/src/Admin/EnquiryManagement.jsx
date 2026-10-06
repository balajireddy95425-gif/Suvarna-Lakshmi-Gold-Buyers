import { useEffect, useState } from "react";
import { enquiryApi } from "../services/api";

function EnquiryManagement() {
  const [enquiries, setEnquiries] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadEnquiries = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await enquiryApi.getAll();

      if (Array.isArray(response.data)) {
        setEnquiries(response.data);
      } else {
        setEnquiries([]);
      }
    } catch (err) {
      console.error(err);

      setError(
        "Unable to load enquiries. Make sure the backend is running."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEnquiries();
  }, []);

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this enquiry?"
    );

    if (!confirmed) {
      return;
    }

    try {
      await enquiryApi.remove(id);

      setEnquiries((previous) =>
        previous.filter(
          (enquiry) => enquiry.id !== id
        )
      );
    } catch (err) {
      console.error(err);

      alert(
        "Unable to delete the enquiry."
      );
    }
  };

  return (
    <div className="admin-management-page">
      <div className="container py-4">

        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">

          <div>
            <h2>Customer Enquiries</h2>

            <p className="text-muted mb-0">
              View enquiries submitted by customers.
            </p>
          </div>

          <a
            href="/admin"
            className="btn btn-outline-dark"
          >
            ← Dashboard
          </a>

        </div>

        {/* Error */}
        {error && (
          <div className="alert alert-danger">
            {error}
          </div>
        )}

        {/* Loading */}
        {loading ? (
          <div className="text-center py-5">
            <div
              className="spinner-border text-warning"
              role="status"
            />

            <p className="mt-3">
              Loading enquiries...
            </p>
          </div>
        ) : enquiries.length === 0 ? (
          <div className="alert alert-info">
            No customer enquiries found.
          </div>
        ) : (
          <div className="card shadow-sm">

            <div className="card-body">

              <div className="table-responsive">

                <table className="table table-bordered table-hover align-middle">

                  <thead className="table-dark">

                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Phone</th>
                      <th>Email</th>
                      <th>Gold Type</th>
                      <th>Weight</th>
                      <th>Estimated Value</th>
                      <th>Message</th>
                      <th>Action</th>
                    </tr>

                  </thead>

                  <tbody>

                    {enquiries.map((enquiry) => (
                      <tr key={enquiry.id}>

                        <td>
                          {enquiry.id}
                        </td>

                        <td>
                          {enquiry.name || "-"}
                        </td>

                        <td>
                          {enquiry.phone || "-"}
                        </td>

                        <td>
                          {enquiry.email || "-"}
                        </td>

                        <td>
                          {enquiry.goldType || "-"}
                        </td>

                        <td>
                          {enquiry.weight
                            ? `${enquiry.weight} g`
                            : "-"}
                        </td>

                        <td>
                          {enquiry.estimatedValue
                            ? `₹${Number(
                                enquiry.estimatedValue
                              ).toLocaleString("en-IN")}`
                            : "-"}
                        </td>

                        <td>
                          {enquiry.message || "-"}
                        </td>

                        <td>
                          <button
                            className="btn btn-sm btn-danger"
                            onClick={() =>
                              handleDelete(
                                enquiry.id
                              )
                            }
                          >
                            Delete
                          </button>
                        </td>

                      </tr>
                    ))}

                  </tbody>

                </table>

              </div>

            </div>

          </div>
        )}

      </div>
    </div>
  );
}

export default EnquiryManagement;