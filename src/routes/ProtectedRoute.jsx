import { Navigate, Outlet } from "react-router";
import { useAuth } from "../Context/AuthContext";
import { useEffect, useState } from "react";
import { Spin } from "antd";

const ProtectedRoute = () => {
  const { user, loading } = useAuth();
  const [isTimeoutReached, setIsTimeoutReached] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsTimeoutReached(true);
    }, 3000);
    return () => clearTimeout(timeout);
  }, []);

  if (loading || !isTimeoutReached) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spin size="large" />
      </div>
    );
  }

  return user ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;
