import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useUserStore } from "@entities/User";

const ProtectedRoute = () => {
  const isLogin = useUserStore((state) => state.isAuthenticated);
  const location = useLocation();

  if (!isLogin) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
