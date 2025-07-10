import { Navigate, Outlet } from "react-router";
import { API_URL } from "../config";

const isTokenValid = (): boolean => {
  const token = localStorage.getItem("token");
  if (!token) return false;

  try {
    //Check if the token is not expired
    const payload = JSON.parse(atob(token.split(".")[1]));
    const now = Math.floor(Date.now() / 1000);
    return payload.exp && payload.exp > now;
  } catch (err) {
    console.error("Invalid token format", err);
    return false;
  }
};

const ProtectedRoute = () => {
  return isTokenValid() ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
