import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const isLoggedIn =
    sessionStorage.getItem("adminLoggedIn") === "true" &&
    Boolean(sessionStorage.getItem("adminToken"));

  if (!isLoggedIn) {
    return <Navigate to="/admin/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
