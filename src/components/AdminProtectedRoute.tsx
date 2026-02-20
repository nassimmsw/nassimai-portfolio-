import { Navigate, Outlet } from "react-router-dom";

export function ProtectedRoute() {
  const isAuthenticated = localStorage.getItem("admin_auth") === "true";

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

export function logout() {
  localStorage.removeItem("admin_auth");
}
