import { Navigate, Outlet } from "react-router";
import { useAuth } from "../Context/AuthContext";

const ProtectedRoute = () => {
  const { user, loading } = useAuth();

  if (loading) return <h1>Loading...</h1>;

  return user ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;
