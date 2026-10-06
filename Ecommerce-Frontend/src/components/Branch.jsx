import React, { useEffect, useState } from "react";
import { branchApi } from "../services/api";


const Branch = () => {
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadBranches = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await branchApi.getActive();

        const data = Array.isArray(response.data)
          ? response.data
          : [];

        setBranches(data);
      } catch (err) {
        console.error("Failed to load branches:", err);
        setError("Unable to load branch information.");
      } finally {
        setLoading(false);
      }
    };

    loadBranches();
  }, []);

  if (loading) {
    return (
      <div className="branch-grid">
        <div className="branch-card">
          <p>Loading branch information...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="branch-grid">
        <div className="branch-card">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (branches.length === 0) {
    return (
      <div className="branch-grid">
        <div className="branch-card">
          <p>No active branches available.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="branch-grid">
      {branches.map((branch) => {
        const phone = branch.phone || "";
        const phoneLink = phone.replace(/\D/g, "");

        const fullAddress = [
          branch.address,
          branch.city,
          branch.state,
          branch.pincode,
        ]
          .filter(Boolean)
          .join(", ");

        return (
          <div
            className="branch-card"
            key={branch.id}
          >
            <h3>{branch.name}</h3>

            <p>
              <strong>Address:</strong>{" "}
              {fullAddress || "Address not available"}
            </p>

            <p>
              <strong>Phone:</strong>{" "}
              {phone || "Phone number not available"}
            </p>

            {phoneLink && (
              <a
                href={`tel:${phoneLink}`}
                className="gold-button"
              >
                Call Branch
              </a>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Branch;