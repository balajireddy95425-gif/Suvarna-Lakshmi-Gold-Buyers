import { Link } from "react-router-dom";

function BranchManagement() {
  return (
    <div className="admin-management-page">
      <div className="container py-4">

        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">

          <div>
            <h2>Branch Management</h2>

            <p className="text-muted mb-0">
              Manage Suvarna Lakshmi Gold Buyers branches.
            </p>
          </div>

          <Link
            to="/admin"
            className="btn btn-outline-dark"
          >
            ← Dashboard
          </Link>

        </div>

        {/* Information */}
        <div className="card shadow-sm">

          <div className="card-body text-center py-5">

            <div
              style={{
                fontSize: "60px",
                marginBottom: "20px",
              }}
            >
              🏪
            </div>

            <h3>
              Branch Management
            </h3>

            <p className="text-muted mx-auto"
              style={{ maxWidth: "650px" }}
            >
              Branch management is currently a
              frontend placeholder. The standalone
              backend does not yet contain a branch
              database table or branch API.
            </p>

            <div className="alert alert-warning mt-4 mx-auto"
              style={{ maxWidth: "650px" }}
            >
              <strong>Next step:</strong>
              <br />
              Add a Branch entity, repository,
              service and controller to the backend
              when branch data needs to be stored
              dynamically.
            </div>

            <Link
              to="/branch"
              className="btn btn-warning mt-2"
            >
              View Branch Page
            </Link>

          </div>

        </div>

      </div>
    </div>
  );
}

export default BranchManagement;